# 🚀 Guía de Configuración - Internal Audit Assistant

## 📋 Pasos para Probar el Sistema de Subida de Documentos

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `env.example`:

```bash
# Copia el archivo de ejemplo
cp env.example .env
```

**Variables críticas que debes configurar:**

```env
# Supabase - Obtén estos valores desde tu dashboard de Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...

# OpenAI - Para generar embeddings
OPENAI_API_KEY=sk-...

# Configuración de Storage
VITE_SUPABASE_STORAGE_BUCKET=audit_documents
```

### 2. Configurar Supabase

#### A. Aplicar Migraciones
```bash
# Asegúrate de tener Supabase CLI instalado
npm install -g supabase

# Inicializar (si no está hecho)
supabase login
supabase link --project-ref tu-project-ref

# Aplicar migraciones
supabase db push
```

#### B. Configurar Variables de Entorno en Supabase
Ve a tu proyecto en Supabase Dashboard → Settings → Edge Functions:

```
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

#### C. Desplegar Edge Functions
```bash
# Desplegar la función de procesamiento de documentos
supabase functions deploy process-document
```

### 3. Verificar el Setup

#### A. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```

#### B. Verificar TypeScript
```bash
npm run type-check
```

#### C. Verificar Tests
```bash
npm test
```

### 4. Probar la Funcionalidad

1. **Abrir la aplicación** en `http://localhost:5173`
2. **Navegar a Upload** (`/upload`)
3. **Subir un documento** (PDF, DOCX, o XLSX)
4. **Verificar el procesamiento** en tiempo real

### 5. Verificar en Supabase Dashboard

#### A. Storage
- Ve a Storage → audit_documents
- Verifica que el archivo se subió correctamente

#### B. Base de Datos
- Tabla `documents`: Debe mostrar el archivo con `processing_status`
- Tabla `document_embeddings`: Debe contener los embeddings generados

#### C. Edge Functions
- Ve a Edge Functions → Logs
- Verifica que `process-document` se ejecutó sin errores

## 🔧 Solución de Problemas

### Error: "Bucket no existe"
```sql
-- Ejecutar en SQL Editor de Supabase
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audit_documents', 'audit_documents', false);
```

### Error: "RLS Policy"
```sql
-- Habilitar RLS en storage.objects si no está habilitado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

### Error: "OpenAI API"
- Verifica que la API key de OpenAI esté configurada correctamente
- Verifica que tengas créditos disponibles en tu cuenta de OpenAI

### Error: "Edge Function timeout"
- Los archivos muy grandes pueden tardar más en procesarse
- Verifica los logs en Supabase Dashboard → Edge Functions

## 📊 Próximos Pasos

Una vez que el sistema de subida funcione correctamente:

1. **Generar Checklists** - Implementar la creación de checklists AS9100
2. **Busqueda Semántica** - Conectar con los embeddings para responder preguntas
3. **Interfaz de Revisión** - Permitir editar respuestas generadas
4. **Exportación** - Generar documentos finales

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema:
1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs en Supabase Dashboard
3. Verifica que el servidor de desarrollo esté corriendo sin errores
4. Comprueba que TypeScript compile sin errores (`npm run type-check`)

---

**¡Estás listo para probar el sistema!** 🎉 