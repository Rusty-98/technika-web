import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styles from '@/components/compstyles/part1.module.css';
import { useDropzone } from 'react-dropzone';
import { Upload, Cancel } from '@mui/icons-material';
import { Button, Box, CircularProgress, Snackbar } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import MuiAlert from '@mui/material/Alert';
import { saveAs } from 'file-saver';


import { Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';



const FormTab = ({ updatedEventName }) => {
    const freeforall = false;
    const [radioSelection, setRadioSelection] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const handleRadioChange = (event) => {
        setRadioSelection(event.target.value);
      };
    const [formData, setFormData] = useState({
        college: '',
        fullname: '',
        email: '',
        branch: '',
        phone: '',
        year: '1st',
        gender: 'male',
        imageUrl: '',
        teamMem:'',
        phone_team1:"",
        phone_team2:"",
        phone_team3:"",
        phone_team4:"",
        name_team1:"",
        name_team2:"",
        name_team3:"",
        phone_team4:"",
        branch_team1:'',
        branch_team2:'',
        branch_team3:'',
        branch_team4:'',
        team_name:""
    });
    const [imageFile, setImageFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [otherCollege, setOtherCollege] = useState('')
    const [severity, setSeverity] = useState('warning')
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    if(window.location.href.substring(window.location.href.lastIndexOf("/")+1)!="techathon"){
document.querySelector("#teamMem")?.remove()
    }

    const uploadImage = async (file) => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "paymentsForEvents");

            const response = await fetch("https://api.cloudinary.com/v1_1/dg5ay449d/image/upload", {
                method: "post",
                body: data
            });


            const result = await response.json();

            return result.url
        } catch (error) {
            console.error(error);
        }
    };


    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);

    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop,
    });
    const handleRemoveImage = async () => {
        try {
            setImageFile(null);
        } catch (error) {
            console.error('Error deleting image:', error.message);
        }
    };

    const handleChange = (index) => {
        setTabIndex(index);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (tabIndex === 0) {

            setTabIndex(1);
        }
    };

    const handleBack = () => {
        if (tabIndex === 1) {
            setTabIndex(0);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOtherCollegeNameChange = (e) => {
        setOtherCollege(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            const requiredFieldsPart1 = [
                { name: 'fullname', label: 'Full Name' },
                { name: 'gender', label: 'Gender' },
                { name: 'email', label: 'Email' },
                { name: 'phone', label: 'Phone' },
                { name: 'year', label: 'Year' },
                { name: 'branch', label: 'Branch' },
            ];

            const emptyFields = requiredFieldsPart1.filter(field => !formData[field.name]);

            if (emptyFields.length > 0) {
                // Show warning if any required field in part 1 is empty
                const missingFields = emptyFields.map(field => field.label).join(', ');
                setSeverity('warning')

                setShowWarning(true);
                setSnackbarMessage(`Please fill in the following fields: ${missingFields}`);
                setTabIndex(0); // Set tab index to 0 (part 1)
                return;
            }
            if (formData.college === 'Other' && otherCollege === '') {
                setSeverity('warning')

                setShowWarning(true);
                setSnackbarMessage(`Please fill the name of your college.`);
                return;
            }

            if (formData.college !== 'HBTU Kanpur' && !imageFile) {
                // Show warning if college is not HBTU and no image is uploaded
                setSeverity('warning')
                setShowWarning(true);
                setSnackbarMessage('Please upload your payment recipt');
                return;
            }
            let updatedFormData = {
                ...formData,
                eventName: updatedEventName,
                college: formData.college === 'Other' ? otherCollege : formData.college,
            };
            if (imageFile) {
                try {
                    const imageUrl = await uploadImage(imageFile);
                    // Update the formData with the uploaded imageUrl
                    updatedFormData = {
                        ...formData,
                        imageUrl: imageUrl,
                        eventName: updatedEventName,
                        college: formData.college === 'Other' ? otherCollege : formData.college,
                    };
                    console.log(formData)
                } catch (error) {
                    console.log(error)
                }
            }


            // Make a POST request to submit the form data using fetch
            const response = await fetch('/api/submiteventform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Optionally, reset form data or perform other actions upon successful submission
                setFormData({
                    college: '',
                    fullname: '',
                    email: '',
                    branch: '',
                    phone: '',
                    year: '1st',
                    gender: 'male',
                    teamMem:'',
                    phone_team1:"",
                    phone_team2:"",
                    phone_team3:"",
                    phone_team4:"",
                    name_team1:"",
                    name_team2:"",
                    name_team3:"",
                    phone_team4:"",
                    branch_team1:'',
                    branch_team2:'',
                    branch_team3:'',
                    branch_team4:'',
                    team_name:''
                });
                setImageFile(null)
                setSeverity('success')
                setShowWarning(true);
                setSnackbarMessage(`Congratulations! You've been successfully registered for this event. Get ready for an amazing experience!`)

                console.log('Form submitted successfully');
                router.push('/thankyou')

            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        } finally {
            setSubmitting(false); // Set submitting back to false after the submission is complete
        }
    };

    const handleWarningClose = () => {
        setShowWarning(false);
    };
    const handleDownloadQR = (qrImageUrl) => {
        // Use the file-saver library to trigger the download
        saveAs(qrImageUrl, `Technika24_QRCode_for_${updatedEventName}.png`);
    };

    return (
        <div className={styles.mainbg}>
            <div className={styles.formContent} data-cursor-color='rgba(255, 155, 255, 0.7)'>
                <div style={{ padding: '20px' }}>
                    <h1 className={styles.mainHeading}>Event Registration Form</h1>
                    <h3 className={styles.subHeading}> ( Your Spot Awaits! )</h3>
                    <h2 className={styles.formTitle}>{updatedEventName}</h2>
                    <div style={{ display: "flex" }}>
                        <div
                            className={styles.tabIndexDiv}
                        >
                            <div
                                style={{
                                    padding: "10px 20px",
                                    color: "white",
                                    cursor: "pointer",
                                    borderBottom: tabIndex === 0 ? "2px solid white" : "none",
                                }}
                                className={styles.tabIndex}
                                onClick={() => handleChange(0)}
                            >
                                Part 1
                            </div>
                            <div
                                style={{
                                    padding: "10px 20px",
                                    color: "white",
                                    cursor: "pointer",
                                    borderBottom: tabIndex === 1 ? "2px solid white" : "none",
                                }}
                                className={styles.tabIndex}
                                onClick={() => handleChange(1)}
                            >
                                Part 2
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <SwipeableViews index={tabIndex} onChangeIndex={handleChange}>
                        <form onSubmit={handleNext}>
                            <div className={styles.partContent}>


                                <div className={styles.inpDiv}>
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inpDiv} id={styles.radioinp}>
                                    <label>Gender</label>
                                    <div className={styles.radioOpt}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="male"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}

                                            />
                                            <label htmlFor="male">Male</label>
                                        </div>
                                        <div>

                                            <input
                                                type="radio"
                                                name="gender"
                                                id="female"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="female">Female</label>
                                        </div>
                                        <div>

                                            <input
                                                type="radio"
                                                name="gender"
                                                id="other"
                                                value="other"
                                                checked={formData.gender === 'other'}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="other">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.inpDiv}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className={styles.inputBox}
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.inpDiv}>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inpDiv}>
                                    <label htmlFor="year">Year</label>
                                    <select
                                        className={styles.inputBox}
                                        name="year"
                                        id="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                        {/* <option value="3rd">3rd</option>
                                        <option value="4th">Final</option> */}
                                    </select>
                                </div>

                                <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch"
                                        id="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                             
                                <div id="teamMem" className={styles.inpDiv}>
                                    <label htmlFor="TeamMember">Team Member</label>
                                    <select
                                        className={styles.inputBox}
                                        name="teamMem"
                                        id="TeamMember"
                                        value={formData.teamMem}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Team Members</option>
                                        <option value="2">2</option>
                                        <option value="3" >3</option>
                                        <option value="4">4</option>
                 
                                    </select>
                                    {(formData.teamMem=='2') && (
        <div>


            <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> First Member:<br/></label>
<br/>


              <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team1"
                                        id="name_team1"
                                        value={formData.name_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
   <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team1"
                                        id="phone_team1"
                                        value={formData.phone_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team1"
                                        id="branch_team1"
                                        value={formData.branch_team1}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Second Member:<br/></label>
<br/>

                                <label htmlFor="phone">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team2"
                                        id="name_team2"
                                        value={formData.name_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="fullname">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team2"
                                        id="phone_team2"
                                        value={formData.phone_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team2"
                                        id="branch_team2"
                                        value={formData.branch_team2}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br>
                                </br>
                                <label htmlFor="fullname">Team Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="team_name"
                                        id="team_name"
                                        value={formData.team_name}
                                        onChange={handleInputChange}
                                        required
                                    />
        </div>)}

                                    {(formData.teamMem == '3' || formData.teamMem == '4') && (
        <div>
          <input
            type="radio"
            value="with a girl"
            checked={radioSelection === 'with a girl'}
            onChange={handleRadioChange}
          /> With a girl
          {/* <input type="radio" value="without a girl" checked={radioSelection === 'without a girl'} onChange={handleRadioChange}/> Without a girl */}
        </div>)}
       


        {(radioSelection === 'with a girl' && formData.teamMem=='3') && (
        
        <div>

<br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> First Member:<br/></label>
<br/>
              <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team1"
                                        id="name_team1"
                                        value={formData.name_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
   <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team1"
                                        id="phone_team1"
                                        value={formData.phone_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team1"
                                        id="branch_team1"
                                        value={formData.branch_team1}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Second Member:<br/></label>
<br/>
                                <label htmlFor="phone">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team2"
                                        id="name_team2"
                                        value={formData.name_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="fullname">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team2"
                                        id="phone_team2"
                                        value={formData.phone_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team2"
                                        id="branch_team2"
                                        value={formData.branch_team2}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Third Member:<br/></label>
<br/>
                                <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team3"
                                        id="name_team3"
                                        value={formData.name_team3}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team3"
                                        id="phone_team3"
                                        value={formData.phone_team3}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team3"
                                        id="branch_team3"
                                        value={formData.branch_team3}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br></br>
                                <label htmlFor="fullname">Team Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="team_name"
                                        id="team_name"
                                        value={formData.team_name}
                                        onChange={handleInputChange}
                                        required
                                    />


        </div>)}
        {(radioSelection === 'with a girl' && formData.teamMem=='4') && (
        <div>
            <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> First Member:<br/></label>
<br/>
              <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team1"
                                        id="name_team1"
                                        value={formData.name_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
   <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team1"
                                        id="phone_team1"
                                        value={formData.phone_team1}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team1"
                                        id="branch_team1"
                                        value={formData.branch_team1}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Second Member:<br/></label>
<br/>
                                <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team2"
                                        id="name_team2"
                                        value={formData.name_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team2"
                                        id="phone_team2"
                                        value={formData.phone_team2}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team2"
                                        id="branch_team2"
                                        value={formData.branch_team2}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Third Member:<br/></label>
<br/>

                                <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team3"
                                        id="name_team3"
                                        value={formData.name_team3}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team3"
                                        id="phone_team3"
                                        value={formData.phone_team3}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team3"
                                        id="branch_team3"
                                        value={formData.branch_team3}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <br/>
            <label style={{fontSize:"1.2rem",margin:"10px"}}> Fourth Member:<br/></label>
<br/>
                                <label htmlFor="fullname">Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="name_team4"
                                        id="name_team4"
                                        value={formData.name_team4}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <label htmlFor="phone">Phone</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="phone_team4"
                                        id="phone_team4"
                                        value={formData.phone_team4}
                                        onChange={handleInputChange}
                                        required
                                    />
       <div className={styles.inpDiv}>
                                    <label htmlFor="branch">Branch</label>
                                    <select
                                        className={styles.inputBox}
                                        name="branch_team4"
                                        id="branch_team4"
                                        value={formData.branch_team4}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ET">ET</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CHE">CHE</option>
                                        <option value="PT">PT</option>
                                        <option value="PL">PL</option>
                                        <option value="FT">FT</option>
                                        <option value="OT">OT</option>
                                        <option value="BE">BE</option>
                                        <option value="LT">LT</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.tech">M.tech</option>
                                        <option value="M.sc">M.sc</option>
                                        <option value="PhD">PhD</option>
                                        <option value="BSMS">BSMS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
<br></br>
                                
                                <label htmlFor="fullname">Team Name</label>
                                    <input
                                        className={styles.inputBox}
                                        type="text"
                                        name="team_name"
                                        id="team_name"
                                        value={formData.team_name}
                                        onChange={handleInputChange}
                                        required
                                    />
        </div>)}


                                </div>
                                <div>
                                    <button type='submit' className={styles.myButton}>
                                        Next
                                    </button>
                                             {(radioSelection === 'without a girl') && (document.querySelector("button")) && (document.querySelector("button").disabled=true )}
        {(radioSelection === 'with a girl') && (document.querySelector("button")) && (document.querySelector("button").disabled=false )}
                                </div>
                            </div>
                                            
                        </form>



                        {/* ______________________part2_________________________ */}



                        <form onSubmit={handleSubmit}>
                            <div className={styles.partContent}>
                                <div className={styles.inpDiv}>
                                    <label htmlFor="college">College</label>
                                    <select
                                        className={styles.inputBox}
                                        name="college"
                                        id="college"
                                        value={formData.college}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Not Selected</option>
                                        <option value="HBTU Kanpur">HBTU Kanpur</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {formData.college === 'Other' && <>
                                    <div className={styles.inpDiv}>
                                        <label htmlFor="othercollegename">College Name</label>
                                        <input
                                            className={styles.inputBox}
                                            type="text"
                                            name="othercollegename"
                                            id="othercollegename"
                                            value={formData.firstname}
                                            onChange={handleOtherCollegeNameChange}
                                            required
                                        />
                                    </div>
                                </>}
                                {(formData.college !== 'HBTU Kanpur' &&window.location.href.substring(window.location.href.lastIndexOf("/")+1)!="techathon" && !freeforall) ? <>
                                    <div className={styles.inpDiv}>
                                        <div className={styles.qrdiv} onClick={handleOpenDialog}>
                                            <div>Click to view QR</div>
                                            <div><QrCode2Icon style={{ width: '2.5rem', height: '2.5rem' }} /></div>
                                        </div>
                                    </div>
                                    <p style={{ color: 'white', marginTop: '2rem' }} className={styles.dndheading}>
                                        Upload or Drag the Payment Recipt below
                                    </p>
                                    {!imageFile && (

                                        <div {...getRootProps()} style={{ cursor: 'pointer', border: '3px solid white', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '2rem', maxWidth: '70%' }} className={styles.dndpara}>
                                            <input {...getInputProps()} />
                                            <p style={{ color: 'white' }} >Drag and drop an image here, or click to select an image</p>
                                            <Upload fontSize='large' style={{ color: 'white' }} />
                                        </div>)}
                                    {imageFile && (
                                        <Box mt={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={handleRemoveImage}

                                            >
                                                <Cancel />Remove Image
                                            </Button>
                                            <img
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            />
                                        </Box>
                                    )}

                                </> : <>
                                    <p style={{ color: 'white', marginTop: '2rem', textAlign: 'center', margin: "2rem 3rem" }} className={styles.dndheading}>
                                        {/* Participating in events is absolutely free for students of HBTU */}
                                        Unlock the tech magic! Join us for a sensory experience in the world of innovation!

                                    </p>
                                    <h3 style={{ color: 'white', marginTop: '2rem', textAlign: 'center', margin: "2rem 3rem" }} className={styles.dndheading}>
                                        Go Ahead
                                    </h3>
                                </>}
                                <button type='submit' className={styles.myButton} style={{ minWidth: '11rem', padding: submitting && '0.2', maxHeight: '2.8rem' }} >
                                    {submitting ? <CircularProgress size={25} style={{ color: 'white', fontWeight: '900' }} /> : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </SwipeableViews>
                </div>
            </div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogContent
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}

                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDownloadQR('/images/eventsqr/eventRegistrationfee.jpg')}
                        style={{ marginBottom: '1rem', marginTop: '1rem', border: '10x solid red' }}
                    >
                        Download QR Code
                    </Button>
                    {/* Render your QR code here */}
                    <div style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
                        <Image
                            width={805}
                            height={799}
                            src={'/images/eventsqr/eventRegistrationfee.jpg'}
                            alt="QR Code"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={showWarning}
                autoHideDuration={6000}
                onClose={handleWarningClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleWarningClose}
                    severity={severity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>


        </div>
    );
};

export default FormTab;
