"""Read-only aggregate queries used by facilitator intelligence."""
from ..database import connection


def session_metrics() -> dict:
    with connection() as database:
        total = database.execute("SELECT COUNT(*) AS count FROM attendees").fetchone()["count"]
        first_time = database.execute("SELECT COUNT(*) AS count FROM attendees WHERE experience_level = 'First time'").fetchone()["count"]
        frequencies = {row["frequency"]: row["count"] for row in database.execute("SELECT frequency, COUNT(*) AS count FROM attendees GROUP BY frequency")}
        comfort = {row["comfort_requirement"]: row["count"] for row in database.execute("SELECT comfort_requirement, COUNT(*) AS count FROM attendees WHERE comfort_requirement IS NOT NULL AND comfort_requirement != 'None' GROUP BY comfort_requirement")}
        sensitive = database.execute("SELECT COUNT(*) AS count FROM attendees WHERE sound_sensitivity != 'Not sensitive'").fetchone()["count"]
        open_requests = database.execute("SELECT COUNT(*) AS count FROM assistance_requests WHERE status = 'OPEN'").fetchone()["count"]
    return {"attendees": total, "first_time": first_time, "frequencies": frequencies, "comfort": comfort, "sound_sensitive": sensitive, "open_requests": open_requests}
