---
name: browse-agents
description: Lista todos los agentes disponibles en el proyecto
---

Muestra una tabla de todos los agentes disponibles en el ecosistema WalkWithDogs, con sus descripciones, comandos y ejemplos de uso.

## Agentes disponibles

| Comando | Descripción | Cuándo usar |
|---------|-------------|------------|
| `/jira-task-creator` | Crea un ticket de Jira a partir de una descripción en lenguaje natural | Cuando tienes una idea, feature request o bug que documentar |
| `/dev-agent` | Implementa un ticket de Jira end-to-end | Cuando tienes un ticket WALKWITHDOGS-XX listo para desarrollar |
| `/qa-agent` | Ejecuta QA completo (tests + UX + accesibilidad + reporte) | Cuando una implementación está lista para validar |
| `/release-manager` | Prepara y ejecuta un release (changelog + tag + GitHub + Jira) | Cuando quieres cerrar el ciclo de entrega y hacer ship |

## Flujo típico de trabajo

1. **Feature Request** → `/jira-task-creator` → describe lo que quieres
2. **Implementación** → `/dev-agent WALKWITHDOGS-XX` → desarrollo automático
3. **Validación** → `/qa-agent WALKWITHDOGS-XX` → QA completo
4. **Release** → `/release-manager` → prepara y publica
