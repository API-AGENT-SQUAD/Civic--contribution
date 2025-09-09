import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TermsAcceptance = ({ 
  acceptedTerms, 
  onTermsChange, 
  acceptedPrivacy, 
  onPrivacyChange, 
  acceptedMarketing, 
  onMarketingChange,
  errors = {} 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="FileText" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Terms and Privacy
            </h3>
            <p className="text-sm text-muted-foreground">
              Please review and accept our terms to complete your registration.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <a 
                  href="/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Terms of Service
                </a>
                {' '}and{' '}
                <a 
                  href="/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </a>
              </span>
            }
            checked={acceptedTerms}
            onChange={(e) => onTermsChange(e?.target?.checked)}
            error={errors?.terms}
            required
          />

          <Checkbox
            label="I consent to the processing of my personal data for account management and service delivery"
            description="Required for core platform functionality"
            checked={acceptedPrivacy}
            onChange={(e) => onPrivacyChange(e?.target?.checked)}
            error={errors?.privacy}
            required
          />

          <Checkbox
            label="I would like to receive updates about new features and relevant open-source opportunities"
            description="Optional: You can change this preference anytime in your settings"
            checked={acceptedMarketing}
            onChange={(e) => onMarketingChange(e?.target?.checked)}
          />
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">
              Your Privacy Matters
            </p>
            <p className="text-muted-foreground">
              We use your information solely to provide personalized issue recommendations and track your contributions. 
              Your data is encrypted and never shared with third parties without your explicit consent.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By creating an account, you acknowledge that you have read and understood our data practices 
          and agree to receive service-related communications.
        </p>
      </div>
    </div>
  );
};

export default TermsAcceptance;