import mongoose from "mongoose";

const portfolioDetailsSchema = new mongoose.Schema({
    template: {
        type: String,
        required: true
    },
    home: {
        welcomeText: String,
        name: String,
        designation: String,
        shortIntro: String,
        img: {
            url: {
                type: String,
                required: true,
                validate: {
                    validator: function(value) {
                        // Validate URL format (example: https://example.com/image.jpg)
                        const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
                        return urlRegex.test(value);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            },
            contentType: {
                type: String,
                required: true
            }
        },
        socialMedia: {
            linkedinUrl: String,
            githubUrl: String,
            twitterUrl: String,
            telegramUrl: String,
            facebookUrl: String,
            whatsappUrl: String
        }
    },
    about: {
        briefIntro: String,
        resume: {
            url: {
                type: String,
                required: true,
                validate: {
                    validator: function(value) {
                        // Validate URL format (example: https://example.com/resume.pdf)
                        const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
                        return urlRegex.test(value);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            }
        }
    },
    skills: [{
        type: String,
        required: true
    }],
    workExperience: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            default: null // Use null if the user is still working in this position
        },
        designation: {
            type: String,
            required: true
        },
        companyName: String,
        workDetails: String
    }],
    education: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            default: null // Use null if the user is still studying
        },
        courseName: {
            type: String,
            required: true
        },
        institutionName: {
            type: String,
            required: true
        }
    }],
    projects: [{
        projectName: {
            type: String,
            required: true
        },
        projectImgUrl: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    // Validate URL format (example: https://example.com/project-image.jpg)
                    const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
                    return urlRegex.test(value);
                },
                message: props => `${props.value} is not a valid URL`
            }
        },
        techUsed: [{
            type: String,
            required: true
        }],
        projectDetails: {
            type: String,
            required: true
        },
        projectLink: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    // Validate URL format (example: https://github.com/user/project)
                    const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
                    return urlRegex.test(value);
                },
                message: props => `${props.value} is not a valid URL`
            }
        }
    }],
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                },
                message: props => `${props.value} is not a valid email address`
            }
        },
        location: {
            type: String,
            required: true
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});


const PortfolioDetails = mongoose.model('PortfolioDetails', portfolioDetailsSchema);

export default PortfolioDetails;
