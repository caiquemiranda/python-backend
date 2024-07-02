import unittest
from app import create_app


class WeatherTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_weather(self):
        response = self.client.get('/weather?city=London')
        self.assertEqual(response.status_code, 200)
        self.assertIn('main', response.json)


if __name__ == '__main__':
    unittest.main()
