interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return <footer className={`${className}`}></footer>;
};

export default Footer;
