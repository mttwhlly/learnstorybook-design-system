/**
- Use a button for...
**/

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { darken, rgba } from "polished";
import { color, typography } from "./shared/styles";
import { easing } from "./shared/animation";

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
`;

const APPEARANCES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
};

const StyledButton = styled.button`
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 12px 36px;
  position: relative;
  letter-spacing: 0.5px;
  word-spacing: 0.6px;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;

  ${Text} {
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    transition: transform 700ms ${easing.rubber};
    opacity: 1;
  }

  svg {
    height: 16px;
    width: 16px;
    vertical-align: top;
    margin-right: 6px;
    margin-top: -2px;
    margin-bottom: -2px;

    /* Necessary for js mouse events to not glitch out when hovering on svgs */
    pointer-events: none;
  }

  ${(props) =>
    props.disabled &&
    `
      cursor: not-allowed !important;
      opacity: 0.5;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
    props.isUnclickable &&
    `
      cursor: default !important;
      pointer-events: none;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
    props.appearance === APPEARANCES.PRIMARY &&
    `
      background: ${color.primary};
      color: ${color.lightest};
          &:hover {
            background: ${darken(0.05, color.primary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
          }

    `}

  ${(props) =>
    props.appearance === APPEARANCES.SECONDARY &&
    `
      background: ${color.secondary};
      color: ${color.lightest};

          &:hover {
            background: ${darken(0.05, color.secondary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
          }

    `}

  ${(props) =>
    props.appearance === APPEARANCES.TERTIARY &&
    `
      background: ${color.tertiary};
      color: ${color.darkest};

          &:hover {
            background: ${darken(0.05, color.tertiary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.tertiary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.tertiary, 0.2)} 0 8px 18px 0px;
          }

    `}
`;

const ButtonLink = StyledButton.withComponent("a");

const applyStyle = (ButtonWrapper) => {
  return (
    ButtonWrapper &&
    StyledButton.withComponent(({ isUnclickable, ...rest }) => (
      <ButtonWrapper {...rest} />
    ))
  );
};

export function Button({
  isDisabled,
  isLink,
  children,
  ButtonWrapper,
  ...props
}) {
  const buttonInner = (
    <Fragment>
      <Text>{children}</Text>
    </Fragment>
  );

  const StyledButtonWrapper = React.useMemo(
    () => applyStyle(ButtonWrapper),
    [ButtonWrapper]
  );

  let SelectedButton = StyledButton;
  if (ButtonWrapper) {
    SelectedButton = StyledButtonWrapper;
  } else if (isLink) {
    SelectedButton = ButtonLink;
  }

  return (
    <SelectedButton disabled={isDisabled} {...props}>
      {buttonInner}
    </SelectedButton>
  );
}

Button.propTypes = {
  /**
   Buttons that have hrefs should use <a> instead of <button>
  */
  isLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf(Object.values(APPEARANCES)),
  isDisabled: PropTypes.bool,
  /**
   Prevents users from clicking on a button multiple times (for things like payment forms)
  */
  isUnclickable: PropTypes.bool,
  ButtonWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Button.defaultProps = {
  isLink: false,
  appearance: APPEARANCES.PRIMARY,
  isDisabled: false,
  isUnclickable: false,
  ButtonWrapper: undefined,
};
