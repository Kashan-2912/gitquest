import { ReactNode } from "react";
import styled from "styled-components";

type CardProps = {
  title?: string;
  subtitle?: string;
  items?: string[];
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

const defaultItems = [
  "10 Launch Weeks",
  "10 Influencers Post",
  "100.000 Views",
  "10 Reddit Posts",
  "2 Hours Marketing Consultation",
];

const Card = ({
  title = "Explosive Growth",
  subtitle = "Perfect for your next content, leave to us and enjoy the result!",
  items = defaultItems,
  eyebrow,
  eyebrowIcon,
  fullWidth = false,
  className,
}: CardProps) => {
  return (
    <StyledWrapper className={className} $fullWidth={fullWidth}>
      <div className="card">
        <div className="card__border" />

        {eyebrow ? (
          <div className="card_label">
            {eyebrowIcon ? <span className="card_label_icon">{eyebrowIcon}</span> : null}
            <span>{eyebrow}</span>
          </div>
        ) : null}

        <div className="card_title__container">
          <span className="card_title">{title}</span>
          <p className="card_paragraph">{subtitle}</p>
        </div>

        {items.length ? <hr className="line" /> : null}

        {items.length ? (
          <ul className="card__list">
            {items.map((item) => (
              <li className="card__list_item" key={item}>
                <span className="check">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="check_svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="list_text">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $fullWidth?: boolean }>`
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --line: hsl(240, 9%, 17%);
  --brand-1: var(--primary, hsl(160, 75%, 45%));
  --brand-2: hsl(158, 64%, 52%);
  --brand-3: hsl(171, 73%, 47%);
  --title-size: ${({ $fullWidth }) => ($fullWidth ? "2.5rem" : "1rem")};
  --subtitle-size: ${({ $fullWidth }) => ($fullWidth ? "1.05rem" : "0.5rem")};
  --card-padding: ${({ $fullWidth }) => ($fullWidth ? "1.75rem" : "1rem")};
  --card-gap: ${({ $fullWidth }) => ($fullWidth ? "1.25rem" : "1rem")};
  --card-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "19rem")};
  --paragraph-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "65%")};

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  display: flex;
  justify-content: ${({ $fullWidth }) => ($fullWidth ? "center" : "flex-start")};

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--card-gap);
    padding: var(--card-padding);
    width: var(--card-width);
    max-width: 100%;
    background-color: hsl(210, 40%, 6%);
    background-image: radial-gradient(at 88% 40%, hsl(210, 40%, 8%) 0px, transparent 85%),
      radial-gradient(at 49% 30%, hsl(210, 40%, 8%) 0px, transparent 85%),
      radial-gradient(at 14% 26%, hsl(210, 40%, 8%) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsl(158, 64%, 52%) 0px, transparent 82%),
      radial-gradient(at 41% 94%, hsl(171, 73%, 47%) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsl(152, 69%, 60%) 0px, transparent 80%);
    border-radius: 1rem;
    box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.12) inset,
      0 25px 80px -40px rgba(0, 0, 0, 0.85),
      0 0 0 1px rgba(45, 212, 191, 0.14);
  }

  .card .card__border {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: -10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-image: linear-gradient(0deg, hsl(152, 69%, 60%) -30%, hsl(210, 15%, 20%) 100%);
    border-radius: 1rem;
  }

  .card .card__border::before {
    content: "";
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%), rotate(0deg);
    transform-origin: left;
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      hsl(158, 64%, 52%) 40%,
      hsl(158, 64%, 52%) 60%,
      hsla(0, 0%, 40%, 0) 100%
    );
    animation: rotate 8s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  .card .card_label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    padding: 0.4rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 9999px;
    font-size: 0.8rem;
    color: hsl(152, 15%, 80%);
  }

  .card .card_label_icon {
    display: grid;
    place-items: center;
    height: 1rem;
    width: 1rem;
  }

  .card .card_title__container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card .card_title__container .card_title {
    font-size: var(--title-size);
    font-weight: 700;
    color: var(--white);
    line-height: 1.1;
  }

  .card .card_title__container .card_paragraph {
    margin-top: 0.1rem;
    width: var(--paragraph-width);
    max-width: 40rem;
    font-size: var(--subtitle-size);
    color: var(--paragraph);
    line-height: 1.5;
  }

  .card .line {
    width: 100%;
    height: 0.1rem;
    background-color: var(--line);
    border: none;
  }

  .card .card__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card .card__list .card__list_item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .card .card__list .card__list_item .check {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background-color: var(--brand-2);
    border-radius: 50%;
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.14);
  }

  .card .card__list .card__list_item .check .check_svg {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--black);
  }

  .card .card__list .card__list_item .list_text {
    font-size: 0.95rem;
    color: var(--white);
  }

  .card .button {
    cursor: pointer;
    padding: 0.9rem 0.5rem;
    width: 100%;
    background-image: linear-gradient(90deg, var(--brand-2) 0%, var(--brand-3) 100%);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--white);
    border: 0;
    border-radius: 9999px;
    box-shadow: inset 0 -2px 25px -4px var(--white),
      0 16px 40px -24px rgba(16, 185, 129, 0.5);
    transition: transform 150ms ease, box-shadow 150ms ease;
  }

  .card .button:hover {
    transform: translateY(-1px);
    box-shadow: inset 0 -2px 25px -4px var(--white),
      0 20px 45px -22px rgba(16, 185, 129, 0.55);
  }

  @media (min-width: 640px) {
    --title-size: ${({ $fullWidth }) => ($fullWidth ? "3rem" : "1.1rem")};
    --subtitle-size: ${({ $fullWidth }) => ($fullWidth ? "1.1rem" : "0.55rem")};
    --card-padding: ${({ $fullWidth }) => ($fullWidth ? "2rem" : "1.1rem")};
  }
`;

export default Card;
