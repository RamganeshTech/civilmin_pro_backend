import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/connectDB.js';
import { errorHandler } from './middleware/error.middleware.js';
import organizationRoutes from './routes/organization_routes/organization.routes.js';
import userRoutes from './routes/user_router/user.routes.js';
import materialCategoryRoutes from './routes/material_routes/materialCategory.routes.js';
import projectRoutes from './routes/project_routes/project.routes.js';
import materialItemRoutes from './routes/material_routes/materialItems.routes.js';
import labourCategoryRoutes from './routes/labour_routes/labourCategory.routes.js';
import labourItemRoutes from './routes/labour_routes/labourItem.routes.js';
import boqRoutes from './routes/boq/boq.routes.js';
import projectClassificationRoutes from './routes/projectClassification_routes/projectClassification.routes.js';
import evidenceRoutes from './routes/evidence_routes/evidence.routes.js';
import lifeCycleRoutes from './routes/lifeCycle_routes/lifeCycle.routes.js';
import appointmentRoutes from './routes/appointment_routes/appointment.routes.js';
import inspectionLotRoutes from './routes/inspectionLot_routes/inspectionLot.routes.js';
import controlRoutes from './routes/control_routes/control.routes.js';
import legalSourceRoutes from './routes/legalSource_routes/legalSource.routes.js';
import statutoryFormRoutes from './routes/statutoryForm_routes/statutoryForm.routes.js';
import defectRoutes from './routes/defect_routes/defect.routes.js';
import rateMasterCategoryRoutes from './routes/rate_master_routes/rate_master_category_routes/rateMasterCategory.routes.js';
import rateMasterItemRoutes from './routes/rate_master_routes/rate_Master_Item_routes/rateMasterItem.routes.js';
import formulaCategoryRoutes from './routes/formula_routes/formulaCategory.routes.js';
import formulaItemRoutes from './routes/formula_routes/formulaItem.routes.js';

// Load environment variables
dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the first proxy hop (Nginx on EC2) — without this, rate-limit and
// req.ip both see Nginx's IP instead of the real client IP, and every
// request gets bucketed under one "user".
app.set('trust proxy', 1);

// Security headers — sets sane defaults (X-Content-Type-Options, HSTS,
// X-Frame-Options, etc.) with almost no config needed
app.use(helmet());

// Request logging — verbose in dev, compact in prod (avoids logging noise on EC2)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' })); // caps JSON payload size — file uploads go through multer, not this

// Global rate limiter — applied to all /api routes.
// Individual routes (login, form submission, etc.) can layer a stricter
// limiter on top of this one, same pattern as submitFormLimiter in AdPilot.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // requests per IP per window
  standardHeaders: true, // adds RateLimit-* headers
  legacyHeaders: false,
  message: { ok: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is running successfully!' });
});

app.use("/api/auth", userRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/material-category", materialCategoryRoutes);
app.use("/api/material-items", materialItemRoutes);
app.use("/api/labour-category", labourCategoryRoutes);
app.use("/api/labour-items", labourItemRoutes);
app.use("/api/boq", boqRoutes);
app.use("/api/project-classification", projectClassificationRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/life-cycle", lifeCycleRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/inspection", inspectionLotRoutes);
app.use("/api/control", controlRoutes);
app.use("/api/legalsource", legalSourceRoutes);
app.use("/api/statutoryform", statutoryFormRoutes);
app.use("/api/defectRoutes", defectRoutes);
app.use("/api/rate-master-category", rateMasterCategoryRoutes);
app.use("/api/rate-master-item", rateMasterItemRoutes);
app.use("/api/formula-category", formulaCategoryRoutes);
app.use("/api/formula-item", formulaItemRoutes);

// Health Check (Optional but recommended for EC2 monitoring)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'active', message: 'server running', timestamp: new Date().toISOString() });
});

// 404 handler — catches unmatched routes before they fall through to errorHandler
app.use((req: Request, res: Response) => {
  res.status(404).json({ ok: false, message: `Route not found: ${req.originalUrl}` });
//   return;
});

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('DB connected ✅');
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log('error from DB connection', error.message);
  });