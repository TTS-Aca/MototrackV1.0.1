cd C:\Users\angel\OneDrive\Documentos\GitHub\MototrackV1.0.1\mototrack_backend
py -m venv venv
if ($LASTEXITCODE -ne 0) { 
    python -m venv venv
    if ($LASTEXITCODE -ne 0) { throw "venv failed with py and python" }
}
.\venv\Scripts\python.exe -m pip install django djangorestframework psycopg2-binary
if ($LASTEXITCODE -ne 0) { throw "pip install failed" }
.\venv\Scripts\django-admin.exe startproject core .
if ($LASTEXITCODE -ne 0) { throw "django-admin failed" }
.\venv\Scripts\python.exe manage.py startapp usuarios
if ($LASTEXITCODE -ne 0) { throw "startapp failed" }
