# ProyectoWEB
Desarrollo del proyecto de aula 2026

## 🛠 Normas de Git y Flujo de Trabajo

Para mantener el proyecto ordenado, seguimos estas reglas:

### 1. Ramas (Branches)
* Nunca trabajes sobre `main`.
* Crea una rama nueva para cada tarea: `git checkout -b nombre-usuario/funcionalidad`
* Ejemplo: `git checkout -b lucas/registro-usuarios`

### 2. Commits con Propósito
Sigue la convención de **Conventional Commits** para que el historial sea legible:
* `feat:` Para una nueva funcionalidad (ej. `feat: agregar sistema de login`)
* `fix:` Para corregir un error (ej. `fix: corregir error en el cálculo de suscripciones`)
* `docs:` Para cambios en la documentación (README, etc.)
* `refactor:` Para cambiar código sin añadir funciones ni corregir errores.

### 3. Flujo de Trabajo (Workflow)
1. **Antes de empezar:**
   ```bash
   git checkout main
   git pull origin main
