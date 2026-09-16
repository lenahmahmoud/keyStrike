import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="flex items-center justify-between
     px-8 py-4 border-t border-white/10 text-sm text-grLight fixed bottom-0  w-[100%]">
      <div className="flex items-center gap-2">
        <span>v1.0.0</span>
        <span>·</span>
        <Link to="/howitworks" className="underline hover:text-white">
          How it works
        </Link>
      </div>
      <span>Press Esc to restart test</span>

    </footer>
  );
};

export default Footer;
