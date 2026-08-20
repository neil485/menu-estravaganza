#!/usr/bin/env bash
# Genera el PDF de la propuesta desde el archivo Markdown
# Requiere: npm install --save-dev md-to-pdf

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Generando PDF de la propuesta..."
npx md-to-pdf "$SCRIPT_DIR/propuesta-extravaganza.md"
echo "PDF generado: docs/propuesta-extravaganza.pdf"
