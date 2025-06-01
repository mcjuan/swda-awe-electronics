import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Searchbar: React.FC = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      // Always go to home with ?search=term
      navigate(`/?search=${encodeURIComponent(term.trim())}`);
    } else if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-xs"
    >
      <Input
        type="text"
        placeholder="Search products..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full"
        aria-label="Search products"
      />
      <Button type="submit" size="icon" variant="outline" aria-label="Search">
        <Search className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default Searchbar;
