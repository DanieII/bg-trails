import mountains from "../assets/bg.jpg";

export default function Header() {
  return (
    <header className="h-[60vh]">
      <img
        src={mountains}
        alt="mountains"
        className="w-full h-full object-cover"
      />
    </header>
  );
}
