from django.core.management.base import BaseCommand
from api.models import Job

class Command(BaseCommand):
    help = 'Seeds the database with sample jobs'

    def handle(self, *args, **options):
        self.stdout.write('Seeding jobs...')
        Job.objects.all().delete()
        jobs = [
            {
                'title': 'Software Development Engineer',
                'description': 'Develop and maintain software applications.',
                'responsibilities': 'Write clean, scalable code. Collaborate with cross-functional teams.',
                'qualifications': 'Bachelors degree in Computer Science or related field. 1+ years of experience.',
                'company': 'Tata Consultancy Services',
                'location': 'Mumbai, Maharashtra',
                'salary': 800000.00,
                'experience_level': 'entry',
            },
            {
                'title': 'Data Analyst',
                'description': 'Analyze data to identify trends and insights.',
                'responsibilities': 'Interpret data, analyze results using statistical techniques. Develop and implement databases.',
                'qualifications': 'Proven working experience as a data analyst or business data analyst. Strong analytical skills.',
                'company': 'Infosys',
                'location': 'Bengaluru, Karnataka',
                'salary': 600000.00,
                'experience_level': 'entry',
            },
            {
                'title': 'Business Analyst',
                'description': 'Bridge the gap between IT and the business.',
                'responsibilities': 'Elicit, analyze, specify, and validate the business needs of stakeholders.',
                'qualifications': 'Bachelors degree in Business Administration or related field. 2+ years of experience.',
                'company': 'Wipro',
                'location': 'Pune, Maharashtra',
                'salary': 700000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'Frontend Developer',
                'description': 'Develop user-facing features for web applications.',
                'responsibilities': 'Develop new user-facing features. Build reusable code and libraries for future use.',
                'qualifications': 'Proficient understanding of web markup, including HTML5, CSS3. Basic understanding of server-side CSS pre-processing platforms.',
                'company': 'HCL Technologies',
                'location': 'Chennai, Tamil Nadu',
                'salary': 750000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'Backend Developer',
                'description': 'Build and maintain the server-side of web applications.',
                'responsibilities': 'Integrate user-facing elements developed by frontend developers with server-side logic. Build reusable code and libraries for future use.',
                'qualifications': 'Proven working experience in backend development. Top-notch programming skills and in-depth knowledge of modern HTML/CSS.',
                'company': 'Tech Mahindra',
                'location': 'Hyderabad, Telangana',
                'salary': 850000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'DevOps Engineer',
                'description': 'Work with developers and IT staff to oversee the code releases.',
                'responsibilities': 'Implement and manage CI/CD pipelines. Monitor and troubleshoot system performance.',
                'qualifications': 'Bachelors degree in Computer Science or related field. 3+ years of experience in a DevOps role.',
                'company': 'Larsen & Toubro Infotech',
                'location': 'Kolkata, West Bengal',
                'salary': 900000.00,
                'experience_level': 'senior',
            },
            {
                'title': 'Cloud Engineer',
                'description': 'Design, implement, and manage cloud-based systems.',
                'responsibilities': 'Design, develop, and deploy modular cloud-based systems. Develop and maintain cloud solution in collaboration with our cloud administration team.',
                'qualifications': 'Bachelors degree in Computer Science or a related field. 2+ years of experience with cloud computing.',
                'company': 'Mindtree',
                'location': 'Bengaluru, Karnataka',
                'salary': 950000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'Cybersecurity Analyst',
                'description': 'Protect computer networks and systems.',
                'responsibilities': 'Monitor networks for security breaches. Investigate security breaches and other cybersecurity incidents.',
                'qualifications': 'Proven work experience as a cybersecurity analyst or similar role. Experience with security software and tools.',
                'company': 'Mphasis',
                'location': 'Mumbai, Maharashtra',
                'salary': 800000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'AI/ML Engineer',
                'description': 'Design and develop AI-powered solutions.',
                'responsibilities': 'Design and develop machine learning and deep learning systems. Run machine learning tests and experiments.',
                'qualifications': 'Proven experience as an AI/ML Engineer or similar role. Strong understanding of data structures, data modeling and software architecture.',
                'company': 'Persistent Systems',
                'location': 'Pune, Maharashtra',
                'salary': 1000000.00,
                'experience_level': 'senior',
            },
            {
                'title': 'Full Stack Developer',
                'description': 'Work on both the front-end and back-end of web applications.',
                'responsibilities': 'Design overall architecture of the web application. Maintain quality and ensure responsiveness of applications.',
                'qualifications': 'Proven experience as a Full Stack Developer or similar role. Experience developing desktop and mobile applications.',
                'company': 'Coforge',
                'location': 'Noida, Uttar Pradesh',
                'salary': 900000.00,
                'experience_level': 'mid',
            },
            {
                'title': 'Database Administrator',
                'description': 'Manage and maintain company databases.',
                'responsibilities': 'Build database systems of high availability and quality depending on each end user’s specialised role. Design and implement database in accordance to end users information needs and views.',
                'qualifications': 'Proven working experience as a Database administrator. Hands-on experience with database standards and end user applications.',
                'company': 'Oracle',
                'location': 'Hyderabad, Telangana',
                'salary': 1100000.00,
                'experience_level': 'senior',
            },
            {
                'title': 'IT Project Manager',
                'description': 'Plan, execute, and finalize IT projects.',
                'responsibilities': 'Coordinate internal resources and third parties/vendors for the flawless execution of projects. Ensure that all projects are delivered on-time, within scope and within budget.',
                'qualifications': 'Proven working experience as a project administrator in the information technology sector. Solid technical background, with understanding or hands-on experience in software development and web technologies.',
                'company': 'Capgemini',
                'location': 'Bengaluru, Karnataka',
                'salary': 1200000.00,
                'experience_level': 'senior',
            },
        ]
        for job_data in jobs:
            Job.objects.create(**job_data)
        self.stdout.write(self.style.SUCCESS('Successfully seeded jobs!'))
