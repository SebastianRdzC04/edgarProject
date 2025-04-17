# test_connection.py
from sqlalchemy import text  # 👈 Importa text

from edgar_server.app.db.session import get_session


def test_db():
    session_gen = get_session()
    session = next(session_gen)
    try:
        result = session.exec(text("SELECT 1")).first()
        print("Conexión exitosa:", result)
    except Exception as e:
        print("Error al conectar:", e)

if __name__ == "__main__":
    test_db()
