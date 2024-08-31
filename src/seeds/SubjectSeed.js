import dotenv from 'dotenv';

dotenv.config();

const subjectData = [
  {
    name: 'Music',
  },
  {
    name: 'Movies',
  },
  {
    name: 'Series',
  },
  {
    name: 'Books',
  },
  {
    name: 'Food',
  },
  {
    name: 'Games',
  },
  {
    name: 'Sports',
  },
  {
    name: 'Hobbies',
  },
  {
    name: 'Career',
  },
]

subjectData.forEach(subject => {
  fetch(`${process.env.API_URL}/subjects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${process.env.API_TOKEN}`,
    },
    body: JSON.stringify(subject),
  })
    .then((response) => response.json())
    .then((data) => console.log(`${subject.name} created: `, data))
    .catch((error) => {
      console.error('Error:', error);
    });
});


