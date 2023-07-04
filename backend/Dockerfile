# Base image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the project code into the container
COPY . /app/

# Run database migrations and collect static files (adjust as per your project's needs)
RUN python manage.py migrate

# Expose the application port
EXPOSE 9000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:9000"]
