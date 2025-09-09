import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SkillAssessment from './components/SkillAssessment';
import ProgressIndicator from './components/ProgressIndicator';
import TrustSignals from './components/TrustSignals';
import TermsAcceptance from './components/TermsAcceptance';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    githubUsername: ''
  });
  
  const [skillLevel, setSkillLevel] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);
  
  const [passwordStrength, setPasswordStrength] = useState(0);

  const steps = [
    { id: 'account', title: 'Create Account', description: 'Basic information and security' },
    { id: 'skills', title: 'Skill Assessment', description: 'Tell us about your experience' },
    { id: 'terms', title: 'Terms & Privacy', description: 'Review and accept policies' }
  ];

  // Password strength calculation
  React.useEffect(() => {
    const calculatePasswordStrength = (password) => {
      let strength = 0;
      if (password?.length >= 8) strength++;
      if (/[a-z]/?.test(password)) strength++;
      if (/[A-Z]/?.test(password)) strength++;
      if (/[0-9]/?.test(password)) strength++;
      if (/[^A-Za-z0-9]/?.test(password)) strength++;
      return strength;
    };
    
    setPasswordStrength(calculatePasswordStrength(formData?.password));
  }, [formData?.password]);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Please enter a valid email';
      if (!formData?.password) newErrors.password = 'Password is required';
      else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 1) {
      if (!skillLevel) newErrors.skillLevel = 'Please select your skill level';
      if (selectedLanguages?.length === 0) newErrors.languages = 'Please select at least one programming language';
      if (selectedDomains?.length === 0) newErrors.domains = 'Please select at least one area of interest';
    }
    
    if (step === 2) {
      if (!acceptedTerms) newErrors.terms = 'You must accept the Terms of Service';
      if (!acceptedPrivacy) newErrors.privacy = 'You must consent to data processing';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        name: `${formData?.firstName} ${formData?.lastName}`,
        email: formData?.email,
        password: formData?.password,
        skillLevel,
        languages: selectedLanguages,
        interests: selectedDomains,
        githubUsername: formData?.githubUsername,
        marketingConsent: acceptedMarketing
      };
      
      const result = await register(userData);
      
      if (result?.success) {
        navigate('/user-dashboard', { 
          state: { message: 'Welcome! Your account has been created successfully.' }
        });
      } else {
        setErrors({ submit: result?.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <RegistrationForm
            formData={formData}
            onFormDataChange={setFormData}
            errors={errors}
            passwordStrength={passwordStrength}
          />
        );
      case 1:
        return (
          <SkillAssessment
            skillLevel={skillLevel}
            onSkillLevelChange={setSkillLevel}
            selectedLanguages={selectedLanguages}
            onLanguagesChange={setSelectedLanguages}
            selectedDomains={selectedDomains}
            onDomainsChange={setSelectedDomains}
            skills={selectedLanguages}
            onUpdate={(data) => {
              if (data.skillLevel) setSkillLevel(data.skillLevel);
              if (data.languages) setSelectedLanguages(data.languages);
              if (data.domains) setSelectedDomains(data.domains);
            }}
            errors={errors}
          />
        );
      case 2:
        return (
          <TermsAcceptance
            acceptedTerms={acceptedTerms}
            onTermsChange={setAcceptedTerms}
            acceptedPrivacy={acceptedPrivacy}
            onPrivacyChange={setAcceptedPrivacy}
            acceptedMarketing={acceptedMarketing}
            onMarketingChange={setAcceptedMarketing}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/login" className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-smooth mb-6">
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Login</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="GitBranch" size={24} color="white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Civic Contributor
              </h1>
            </div>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              Join thousands of developers making meaningful contributions to open-source projects that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trust Signals Sidebar */}
            <div className="lg:order-2">
              <TrustSignals />
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  What happens next?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                      <Icon name="Search" size={12} className="text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Personalized Recommendations</p>
                      <p className="text-muted-foreground">Get issue suggestions based on your skills</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                      <Icon name="BookOpen" size={12} className="text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Learn & Contribute</p>
                      <p className="text-muted-foreground">Start with beginner-friendly issues</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                      <Icon name="Users" size={12} className="text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Join Community</p>
                      <p className="text-muted-foreground">Connect with like-minded developers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Registration Form */}
            <div className="lg:col-span-2 lg:order-1">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={steps?.length}
                  steps={steps}
                />

                {errors?.submit && (
                  <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <p className="text-sm text-error">{errors?.submit}</p>
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>

                  {currentStep < steps?.length - 1 ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isLoading}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Create Account
                    </Button>
                  )}
                </div>

                {/* Login Link */}
                <div className="text-center mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;