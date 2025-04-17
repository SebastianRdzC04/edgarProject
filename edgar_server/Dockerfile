FROM python:3.11-slim

# Configurar el directorio de trabajo
WORKDIR /edgar_server

# Copiar archivos necesarios
COPY requirements.txt .
COPY .env .
COPY . .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Configurar PYTHONPATH para que encuentre los módulos correctamente
ENV PYTHONPATH=/edgar_server

# Exponer el puerto usando la variable
EXPOSE ${API_PORT}

# Usar el puerto de la variable de entorno
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${API_PORT}"]
