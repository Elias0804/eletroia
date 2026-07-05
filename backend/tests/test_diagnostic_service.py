import unittest

from app.services.diagnostic import diagnose_issues


class DiagnosticServiceTests(unittest.TestCase):
    def test_returns_follow_up_questions_for_power_related_symptoms(self) -> None:
        issues = diagnose_issues(["não liga", "não acende"])

        self.assertTrue(issues)
        self.assertEqual(issues[0].title, "Aparelho não liga")
        self.assertTrue(issues[0].follow_up_questions)

    def test_returns_confidence_for_heat_related_symptoms(self) -> None:
        issues = diagnose_issues(["esquenta", "muito quente"])

        self.assertTrue(issues)
        self.assertGreaterEqual(issues[0].confidence, 0.5)


if __name__ == "__main__":
    unittest.main()
