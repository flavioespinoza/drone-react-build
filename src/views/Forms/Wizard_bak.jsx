import * as React from "react";

import Wizard from "components/Wizard/Wizard";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1";
import Step2 from "./WizardSteps/Step2";
import Step3 from "./WizardSteps/Step3";
import Step4 from "./WizardSteps/Step4";
import Step_ClaimAbout from "./WizardSteps/Step_ClaimAbout";
import Step_ClaimType from "./WizardSteps/Step_ClaimType";
import Step_Evidence from "./WizardSteps/Step_Evidence";
import Step6 from "./WizardSteps/Step6";
import StepPersonPropVal from "./WizardSteps/StepPersonPropVal";

class WizardView_bak extends React.Component {
	render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
						validate
						title="Issuer"
            subtitle="Fred Arnold"
            steps={[
							{ 
								stepName: "About", 
								stepComponent: Step_ClaimAbout, 
								stepProps: {},
								stepId: "claim_about" 
							},
							{ 
								stepName: "Person", 
								stepComponent: Step1, 
								stepProps: {},
								stepId: "subject" 
							},
							{ 
								stepName: "Type", 
								stepComponent: Step_ClaimType, 
								stepProps: {},
								stepId: "claim_type" 
							},
							{ 
								stepName: "Relationships", 
								stepComponent: Step2, 
								stepProps: {},
								stepId: "relationships" 
							},
              // { 
							// 	stepName: "Knows", 
							// 	stepComponent: Step1, 
							// 	stepProps: {},
							// 	stepId: "knows" 
							// },
              { 
								stepName: "Property", 
								stepComponent: StepPersonPropVal, 
								stepProps: {},
								stepId: "person_prop_val" 
							},
              { 
								stepName: "Proofing", 
								stepComponent: Step4, 
								stepProps: {},
								stepId: "proofing" 
							},
              { 
								stepName: "Evidence", 
								stepComponent: Step_Evidence, 
								stepProps: {},
								stepId: "evidence" 
							},
							{ 
								stepName: "Request Verifications", 
								stepComponent: Step6, 
								stepProps: {},
								stepId: "verifications" 
							},
							{ 
								stepName: "Accountability", 
								stepComponent: Step6, 
								stepProps: {},
								stepId: "accountability" 
							}
            ]}
            finishButtonClick={(e) => {
								console.log(e)
						}}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView_bak;
