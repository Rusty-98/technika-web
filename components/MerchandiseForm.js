import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styles from '@/components/compstyles/part1.module.css';
import { useDropzone } from 'react-dropzone';
import { Upload, Cancel } from '@mui/icons-material';
import { Button, Box, CircularProgress, Snackbar } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import { Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';
import { saveAs } from 'file-saver';
const itemDetails = {
    diary: {
        item: 'diary',
        heading: 'Diary',
        price: 49,
        MRP: 49,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/noteopen.webp',
        qr: '/images/merchqr/diary.jpg'
    },
    keychain: {
        item: 'keychain',
        heading: 'Key Chain',
        price: 39,
        MRP: 39,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/noteopen.webp',
        qr: '/images/merchqr/keychain2.jpg'


    },
    coffeemug: {
        item: 'coffeemug',
        heading: 'Coffee Mug',
        price: 129,
        MRP: 129,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/noteopen.webp',
        qr: '/images/merchqr/cup.jpg'


    },
    pen: {
        item: 'pen',
        heading: 'Pen',
        price: 12,
        MRP: 12,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/noteopen.webp',
        qr: '/images/merchqr/pen.jpg'

    },
    combo: {
        item: 'combo',
        heading: 'Combo',
        price: 199,
        MRP: 199,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/combo.JPG',
        qr: '/images/merchqr/combo.jpg'


    },
    tshirtb: {
        item: 'tshirtb',
        heading: 'Tshirt Boy Print',
        price: 499,
        MRP: 599,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/tshirt.JPG',
        qr: '/images/merchqr/tshirt.jpg',
    },
    tshirtg: {
        item: 'tshirtg',
        heading: 'Tshirt Girl Print',
        price: 499,
        MRP: 599,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/tshirt.JPG',
        qr: '/images/merchqr/tshirt.jpg'
    },
    tshirtcombo: {
        item: 'tshirtcombo',
        heading: 'Tshirt Combo',
        price: 849,
        MRP: 999,
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/images/merch/t-shirt-combo.png',
        qr: '/images/merchqr/shirtComboQr.jpg'
    },
};






const MerchandiseForm = ({ item }) => {
    const router = useRouter()
    const itemKiDetails = itemDetails[item];
    const freeforall = false;
    const [tabIndex, setTabIndex] = useState(0);

    const [formData, setFormData] = useState({
        college: '',
        fullname: '',
        email: '',
        branch: '',
        phone: '',
        year: '1st',
        gender: 'male',
        imageUrl: '',
        // Additional fields for t-shirt
        size: 'S',
        sizeB: 'S',
        sizeG: 'S',
        nameOnTshirt: '',
        nameOnTshirtB: '',
        nameOnTshirtG: '',
        couponCode: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [otherCollege, setOtherCollege] = useState('')
    const [severity, setSeverity] = useState('warning')
    // coupons
    const [discountPercent, setDiscountPercent] = useState(0)
    const [finalPrice, setFinalPrice] = useState(itemKiDetails?.price);
    const [finalQR, setFinalQR] = useState(itemKiDetails?.qr);
    const [couponName, setCouponName] = useState('')
    const [couponValidation, setCouponValidation] = useState({
        loading: false,
        success: false,
        message: '',
    });
    const [openSizeChart, setOpenSizeChart] = useState(false);
    const handleOpenSizeChart = () => {
        setOpenSizeChart(true);
    };

    const handleCloseSizeChart = () => {
        setOpenSizeChart(false);
    };





    const getFinalPriceAndQR = (couponName) => {
        let discountPercent = 0;
        let finalPrice = itemKiDetails?.price
        let finalQR = itemKiDetails?.qr
        switch (couponName) {
            case 'GRUV':
                discountPercent = 33;
                setDiscountPercent(33)
                finalPrice = (itemKiDetails?.MRP - ((itemKiDetails?.MRP * discountPercent) / 100)).toFixed(2);
                finalQR = '/images/merchqr/tshirtwithgruvcoupon.jpg'
                break;
            case 'OFFER33':
                discountPercent = 33;
                setDiscountPercent(33)
                finalQR = '/images/merchqr/tshirtwithgruvcoupon.jpg'
                finalPrice = (itemKiDetails?.MRP - ((itemKiDetails?.MRP * discountPercent) / 100)).toFixed(2);
                console.log(`${finalPrice} ${discountPercent}%`)
                break;
            case 'OFFER30':
                discountPercent = 30;
                setDiscountPercent(30)
                finalQR = '/images/merchqr/tshirtwithoffer30coupon.jpg'
                finalPrice = (itemKiDetails?.MRP - ((itemKiDetails?.MRP * discountPercent) / 100)).toFixed(2);
                console.log(`${finalPrice} ${discountPercent}%`)
                break;
            default:
                discountPercent = 0;
                setDiscountPercent(0);
                finalQR = itemKiDetails?.qr;
                finalPrice =itemKiDetails?.price;
                console.log(`${finalPrice} ${discountPercent}%`)
                break;
        }

        return { finalPrice, finalQR }
    };





    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const uploadImage = async (file) => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "merchandise");

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

            if (!imageFile) {
                // Show warning if college is not HBTU and no image is uploaded
                setSeverity('warning')
                setShowWarning(true);
                setSnackbarMessage('Please upload your payment recipt');
                return;
            }
            let updatedFormData = {
                ...formData,
                item: item,
                college: formData.college === 'Other' ? otherCollege : formData.college,
            };

            if (imageFile) {
                try {
                    const imageUrl = await uploadImage(imageFile);
                    // Update the formData with the uploaded imageUrl
                    updatedFormData = {
                        ...formData,
                        imageUrl: imageUrl,
                        item: item,
                        college: formData.college === 'Other' ? otherCollege : formData.college,
                    };
                    console.log(formData)
                } catch (error) {
                    console.log(error)
                }
            }


            // Remove the rupee symbol from the price if present
            const cleanPrice = itemDetails[item]?.price;

            if (!couponValidation.success) {
                // Use itemKiDetails.price if no coupon code or unsuccessful coupon validation
                updatedFormData = {
                    ...updatedFormData,
                    couponCode: '',
                    price: cleanPrice, // Adjust the default price as needed
                };
            } else {

                console.log('deb1')
                updatedFormData = {
                    ...updatedFormData,
                    couponCode: couponValidation.success ? formData.couponCode : '',
                    price: finalPrice,
                };
            }
            console.log('deb2')

            console.log('deb3')

            console.log(updatedFormData.price)
            if (item === 'tshirtg') {
                // Clear couponCode if coupon validation is not successful
                updatedFormData = {
                    ...updatedFormData,
                    tshirtVariant: 'girl print'
                };
            }

            if (item === 'tshirtb') {
                // Clear couponCode if coupon validation is not successful
                updatedFormData = {
                    ...updatedFormData,
                    tshirtVariant: 'boy print'
                };
            }
            if (item === 'tshirtcombo') {
                // Clear couponCode if coupon validation is not successful
                updatedFormData = {
                    ...updatedFormData,
                    tshirtVariant: 'Tshirt Combo'
                };
            }

            console.log('deb4')
            console.log(updatedFormData)
            // Make a POST request to submit the form data using fetch
            const response = await fetch('/api/buymerchandise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            console.log('deb5')

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
                    nameOnTshirt: '',
                    couponCode: '',
                });
                setImageFile(null)
                setSeverity('success')
                setShowWarning(true);
                setSnackbarMessage(`Congratulations! on your order`)

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
    const handleDownloadQR = () => {
        let qrImageUrl = itemKiDetails?.qr; // Default QR code

        if (couponValidation.success) {
            // Use a different QR code if the coupon is successfully applied
            qrImageUrl = couponName === 'GRUV' || couponName === 'OFFER33'
                ? '/images/merchqr/tshirtwithgruvcoupon.jpg'
                : '/images/merchqr/tshirtwithcoupon.jpg';
        }

        // Use the file-saver library to trigger the download
        saveAs(qrImageUrl, `Technika24_QRCode_for_${itemKiDetails?.heading}.png`);
    };

    const handleApplyCoupon = async () => {
        try {
            setCouponValidation({ loading: true, success: false, message: '' });

            // Make a POST request to validate the coupon code
            const response = await fetch('/api/validate-couponcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ couponCode: formData.couponCode }),
            });

            const result = await response.json();
            if (response.ok) {
                setCouponValidation({ loading: false, success: true, message: 'Coupon Code Applied Successfully' });
                setCouponName(result.name)

                // Update the form data with coupon details
                setFormData((prevData) => ({
                    ...prevData,
                    coupon: {
                        code: formData.couponCode,
                        price: itemKiDetails?.price,
                    },
                }));
            } else {
                setCouponValidation({ loading: false, success: false, message: result.message });
            }
            const { finalPrice, finalQR } = getFinalPriceAndQR(result.name);

            setFinalPrice(finalPrice);
            setFinalQR(finalQR);
        } catch (error) {
            console.error('Error applying coupon code:', error.message);
            setCouponValidation({ loading: false, success: false, message: 'Internal Server Error' });
        }
    };


    return (
        <div className={styles.mainbg}>
            <div className={styles.formContent} data-cursor-color='rgba(255, 155, 255, 0.7)'>
                <div style={{ padding: '20px' }}>
                    <h1 className={styles.mainHeading}>Your Merchandise Awaits</h1>

                    <h2 className={styles.formTitle}>{itemKiDetails?.heading}</h2>
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
                                        <option value="3rd">3rd</option>
                                        <option value="4th">Final</option>
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
                                    </select>
                                </div>

                                <div>
                                    <button type='submit' className={styles.myButton}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>



                        {/* _______________________part2__________________________ */}

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

                                {/* Additional options for T-shirt */}
                                {(item === 'tshirtg' || item === 'tshirtb' || item === 'tshirtcombo') && (
                                    <>
                                        {item === 'tshirtcombo' ? (<>
                                            <div className={styles.inpDiv}>
                                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                    <label htmlFor="size">Size for Boy's Print</label>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleOpenSizeChart}
                                                        >
                                                            Size Chart
                                                        </Button>

                                                    </div>

                                                </div>
                                                <select
                                                    className={styles.inputBox}
                                                    name="sizeB"
                                                    id="sizeB"
                                                    value={formData.sizeB}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="S">S - Small</option>
                                                    <option value="M">M - Medium</option>
                                                    <option value="L">L - Large</option>
                                                    <option value="XL">XL - Extra Large</option>
                                                    <option value="XXL">XXL - Extra Large</option>
                                                </select>
                                            </div>
                                            <div className={styles.inpDiv}>
                                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                    <label htmlFor="size">Size for Girl's Print</label>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleOpenSizeChart}
                                                        >
                                                            Size Chart
                                                        </Button>

                                                    </div>

                                                </div>
                                                <select
                                                    className={styles.inputBox}
                                                    name="sizeG"
                                                    id="sizeG"
                                                    value={formData.sizeG}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="S">S - Small</option>
                                                    <option value="M">M - Medium</option>
                                                    <option value="L">L - Large</option>
                                                    <option value="XL">XL - Extra Large</option>
                                                    <option value="XXL">XXL - Extra Large</option>
                                                </select>
                                            </div>
                                        </>) : <div className={styles.inpDiv}>
                                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                <label htmlFor="size">Size</label>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleOpenSizeChart}
                                                    >
                                                        Size Chart
                                                    </Button>

                                                </div>

                                            </div>
                                            <select
                                                className={styles.inputBox}
                                                name="size"
                                                id="size"
                                                value={formData.size}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="S">S - Small</option>
                                                <option value="M">M - Medium</option>
                                                <option value="L">L - Large</option>
                                                <option value="XL">XL - Extra Large</option>
                                                <option value="XXL">XXL - Extra Large</option>
                                            </select>
                                        </div>}
                                        {item === 'tshirtcombo' ? <>
                                            <div className={styles.inpDiv}>
                                                <label htmlFor="nameOnTshirt">Name on Boy's Print (Max 10 characters)</label>
                                                <input
                                                    className={styles.inputBox}
                                                    type="text"
                                                    name="nameOnTshirtB"
                                                    id="nameOnTshirtB"
                                                    value={formData.nameOnTshirtB}
                                                    onChange={(e) => {
                                                        // Limit input to 10 characters
                                                        if (e.target.value.length <= 10) {
                                                            handleInputChange(e);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.inpDiv}>
                                                <label htmlFor="nameOnTshirt">Name on Girl's Print (Max 10 characters)</label>
                                                <input
                                                    className={styles.inputBox}
                                                    type="text"
                                                    name="nameOnTshirtG"
                                                    id="nameOnTshirtG"
                                                    value={formData.nameOnTshirtG}
                                                    onChange={(e) => {
                                                        // Limit input to 10 characters
                                                        if (e.target.value.length <= 10) {
                                                            handleInputChange(e);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </> : <>
                                            <div className={styles.inpDiv}>
                                                <label htmlFor="nameOnTshirt">Name on T-shirt (Max 10 characters)</label>
                                                <input
                                                    className={styles.inputBox}
                                                    type="text"
                                                    name="nameOnTshirt"
                                                    id="nameOnTshirt"
                                                    value={formData.nameOnTshirt}
                                                    onChange={(e) => {
                                                        // Limit input to 10 characters
                                                        if (e.target.value.length <= 10) {
                                                            handleInputChange(e);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </>}
                                        {item !== 'tshirtcombo' && <div className={styles.inpDiv}>
                                            <label htmlFor="couponCode">Coupon Code</label>
                                            <input
                                                className={styles.inputBox}
                                                type="text"
                                                name="couponCode"
                                                id="couponCode"
                                                value={formData.couponCode}
                                                onChange={handleInputChange}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleApplyCoupon}
                                                style={{ marginLeft: '0.5rem', minWidth: '30%' }}
                                            >
                                                {couponValidation.loading ? 'Verifying' : 'Apply'}
                                            </Button>

                                            {/* coupon validation messages */}
                                            {couponValidation.message && (
                                                <>
                                                    <div style={{ color: couponValidation.success ? 'green' : 'red', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                                        {couponValidation.message}
                                                    </div>

                                                    {couponValidation.success && (
                                                        <>
                                                            <div style={{ color: 'green', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                                                {discountPercent}% discount on ₹599
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <div style={{ marginTop: '3rem', color: 'white' }}>Amount Payable: <span style={{ textDecoration: 'line-through', opacity: '0.8', fontWeight: '300' }}>{itemKiDetails?.MRP}</span> {finalPrice}</div>
                                            </div>
                                        </div>}
                                    </>
                                )}

                                {(!freeforall) ? <>
                                    <div className={styles.inpDiv}>
                                        <div className={styles.qrdiv} onClick={handleOpenDialog}>
                                            <div>Click to view QR</div>
                                            <div><QrCode2Icon style={{ width: '2.5rem', height: '2.5rem' }} /></div>
                                        </div>
                                    </div>
                                    <p style={{ color: 'white', marginTop: '2rem', textAlign: 'center' }} className={styles.dndheading}>
                                        Upload or Drag and Drop the Payment Recipt below
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
                        onClick={() => handleDownloadQR(finalQR)}
                        style={{ marginBottom: '1rem', marginTop: '1rem', border: '10x solid red' }}
                    >
                        Download QR Code
                    </Button>

                    {/* Render your QR code here */}
                    <div style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
                        <Image
                            width={805}
                            height={799}
                            src={finalQR}
                            alt="QR Code"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </DialogContent>
            </Dialog>


            {/* size chart */}
            <Dialog
                open={openSizeChart}
                onClose={handleCloseSizeChart}

            >
                <DialogContent
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}

                >

                    {/* Render your QR code here */}
                    <div style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
                        <Image
                            width={805}
                            height={799}
                            src={'/images/sizechart.png'}
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

export default MerchandiseForm;
