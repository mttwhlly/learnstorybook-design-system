import React from "react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import styled from "styled-components";
import { Button } from "./Button";
import { StoryLinkWrapper } from "./StoryLinkWrapper";
import { withDesign } from "storybook-addon-designs";

const CustomButton = styled.button`
  border: 1px solid green;
  background: lightgreen;
  color: rebeccapurple;
  padding: 1em;
  font-size: 1.2em;
`;

// When the user clicks a button, it will trigger the `action()`,
// ultimately showing up in Storybook's addon panel.
function ButtonWrapper(props) {
  return <CustomButton {...props} />;
}

export default {
  title: "Design System/Button",
  component: Button,
  /*
   * More on Storybook argTypes at:
   * https://storybook.js.org/docs/react/api/argtypes
   */
  // argTypes: {},
  /*
   * More on Storybook parameters at:
   * https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
   */
  // parameters: {
  //   componentSubtitle: "For clicking",
  // },
};

/*
 * New story using Controls
 * Read more about Storybook templates at:
 * https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const Template = args => <Button {...args} />;

export const AllButtons = (args) => (
  <div>
    <Button appearance="primary">
      Default
    </Button>
    <Button appearance="secondary">Default</Button>
    <Button appearance="tertiary">Default</Button>
    <br/>
    <Button appearance="primary" isDisabled>
      Disabled
    </Button>
    <Button appearance="secondary" isDisabled>
      Disabled
    </Button>
    <Button appearance="tertiary" isDisabled>
      Disabled
    </Button>
  </div>
);
AllButtons.storyName = "All Buttons";
AllButtons.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/HhsnVrGF7RTL3Ci55bJuV1/CAQH-Design-Standards-2.0?node-id=2%3A1116&t=Oy0j3JfWoq9lAnen-4",
  },
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  appearance: "primary",
  children: "Default"
}
PrimaryButton.storyName = "Primary";

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  appearance: "secondary",
  children: "Default"
  }
SecondaryButton.storyName = "Secondary";

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
  appearance: "tertiary",
  children: "Default"
  }
TertiaryButton.storyName = "Tertiary";

export const PrimaryDisabledButton = Template.bind({});
PrimaryDisabledButton.args = {
  appearance: "primary",
  children: "Disabled",
  isDisabled: "true"
  }
PrimaryDisabledButton.storyName = "Primary (Disabled)";

export const SecondaryDisabledButton = Template.bind({});
SecondaryDisabledButton.args = {
  appearance: "secondary",
  children: "Disabled",
  isDisabled: "true"
  }
SecondaryDisabledButton.storyName = "Secondary (Disabled)";

export const TertiaryDisabledButton = Template.bind({});
TertiaryDisabledButton.args = {
  appearance: "tertiary",
  children: "Disabled",
  isDisabled: "true"
  }
TertiaryDisabledButton.storyName = "Tertiary (Disabled)";

/*
 * New story using the play function.
 * See https://storybook.js.org/docs/react/writing-stories/play-function
 * to learn more about the play function.
 */
export const WithInteractions = (args) => <Button {...args} />;
WithInteractions.args = {
  appearance: "primary",
  // href: "http://proview.caqh.org",
  // ButtonWrapper: StoryLinkWrapper,
  children: "Button",
};

WithInteractions.play = async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  // expect(canvas.getByRole("button")).toHaveAttribute(
  //   "appearance",
  //   "primary"
  // );
};
