const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const Volunteer = require('./models/Volunteer');
const Teacher = require('./models/Teacher');
const jwt = require('jsonwebtoken');
const Opportunity = require('./models/Opportunity');
const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://yashnathani455:BInPGc3z6cZiknqD@cluster0.0mbbor9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, contactNumber } = req.body;

  try {
    // Check if the user already exists
    let volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    volunteer = new Volunteer({
      firstName,
      lastName,
      email,
      password,
      contactNumber
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    volunteer.password = await bcrypt.hash(password, salt);

    await volunteer.save();

    res.status(200).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) {
//       return res.status(400).json({ msg: 'User does not exist' });
//     }

//     // Check the password
//     const isMatch = await bcrypt.compare(password, volunteer.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = generateToken(volunteer);

//     res.status(200).json({ msg: 'Login successful', token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
app.post('/api/login',async(req,res)=>{
  const {email,password} = req.body;
  const volunteer = await Volunteer.findOne({email});
  if (volunteer) {
      
      const passOk = bcrypt.compareSync(password, volunteer.password);
      if (passOk){
          const token = jwt.sign({
              email:volunteer.email,
              id:volunteer._id
          },jwtSecret);
          res.status(200).send({
              msg: "Login Successful...!",
              email: volunteer.email,
              token
          });          
      }else {
          res.status(422).json('pass not ok');
        }
  }
  else{
      res.json('not found');
  }

})

app.post('/api/register_teacher', async (req, res) => {
    const { firstName, lastName, email, password, contactNumber } = req.body;
  
    try {
      // Check if the teacher already exists
      let teacher = await Teacher.findOne({ email });
      if (teacher) {
        return res.status(400).json({ msg: 'Teacher already exists' });
      }
  
      // Create a new teacher
      teacher = new Teacher({
        firstName,
        lastName,
        email,
        password,
        contactNumber,
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
  
      await teacher.save();
  
      res.status(200).json({ msg: 'Teacher registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  // app.post('/api/login_teacher', async (req, res) => {
  //   const { email, password } = req.body;
  
  //   try {
  //     // Check if the teacher exists
  //     let teacher = await Teacher.findOne({ email });
  //     if (!teacher) {
  //       return res.status(400).json({ msg: 'Invalid credentials' });
  //     }
  
  //     // Compare passwords
  //     const isMatch = await bcrypt.compare(password, teacher.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ msg: 'Invalid credentials' });
  //     }
  
  //     res.status(200).json({ msg: 'Login successful', teacherId: teacher._id }); // You can customize the response as needed
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Server error');
  //   }
  // });
  app.post('/api/login_teacher',async(req,res)=>{
    const {email,password} = req.body;
    const teacher = await Teacher.findOne({email});
    if (teacher) {
        
        const passOk = bcrypt.compareSync(password, teacher.password);
        if (passOk){
            const token = jwt.sign({
                email:teacher.email,
                id:teacher._id
            },jwtSecret);
            res.status(200).send({
                msg: "Login Successful...!",
                email: teacher.email,
                token
            });          
        }else {
            res.status(422).json('pass not ok');
          }
    }
    else{
        res.json('not found');
    }
  
  })
  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Server error');
      }
      res.json({ msg: 'Logged out' });
    });
  });
  app.post("/api/opportunities", async (req, res) => {
    const { title, description, state, city, startDate, endDate, lastDayToApply, hoursPerDay } = req.body;
  
    // Extract teacherId from JWT token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  
    try {
      const decodedToken = jwt.verify(token, "fasefraw4r5r3wq45wdfgw34twdfg");
      const teacherId = decodedToken.id;
  
      const newOpportunity = new Opportunity({
        title,
        description,
        state,
        city,
        startDate,
        endDate,
        lastDayToApply,
        hoursPerDay,
        teacherId,
      });
  
      await newOpportunity.save();
      res.status(201).json({ msg: 'Opportunity created successfully', opportunity: newOpportunity });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  app.use(express.json());

  // Existing code...
  
  // Endpoint to fetch opportunities created by a specific teacher
  app.get('/api/opportunities', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  
    try {
      const decodedToken = jwt.verify(token, "fasefraw4r5r3wq45wdfgw34twdfg");
      const teacherId = decodedToken.id;
  
      const opportunities = await Opportunity.find({ teacherId });
      res.status(200).json(opportunities);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  });
  app.get('/api/all-opportunities', async (req, res) => {
    try {
      const opportunities = await Opportunity.find().populate('teacherId', 'firstName lastName email');
      res.status(200).json(opportunities);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  app.post('/api/opportunities/:id/signup', async (req, res) => {
    const { id } = req.params;
    const { email, mobile, timeCommitment, note } = req.body;
    
    try {
      const volunteer = await Volunteer.findOne({ email });
      if (!volunteer) {
        return res.status(404).json({ msg: 'Volunteer not found' });
      }
  
      const opportunity = await Opportunity.findById(id);
      if (!opportunity) {
        return res.status(404).json({ msg: 'Opportunity not found' });
      }
  
      // Update volunteer details and applied opportunities
      volunteer.mobile = mobile;
      volunteer.timeCommitment = timeCommitment;
      volunteer.note = note;
      volunteer.appliedOpportunities.push(opportunity._id);
  
      // Update opportunity applicants
      opportunity.applicants.push(volunteer._id);
  
      await volunteer.save();
      await opportunity.save();
  
      res.status(200).json({ msg: 'Signed up for the opportunity successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
// Backend code
app.get('/api/volunteer/applied-opportunities', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, "fasefraw4r5r3wq45wdfgw34twdfg");
    const volunteerId = decodedToken.id;

    const opportunities = await Opportunity.find({ "applicants": volunteerId });
    res.status(200).json(opportunities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
