import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2 transition-smooth
              ${index < currentStep 
                ? 'bg-primary border-primary text-primary-foreground' 
                : index === currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-background border-border text-muted-foreground'
              }
            `}>
              {index < currentStep ? (
                <Icon name="Check" size={16} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`
                w-12 md:w-24 h-0.5 mx-2 transition-smooth
                ${index < currentStep ? 'bg-primary' : 'bg-border'}
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          {steps?.[currentStep]?.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;