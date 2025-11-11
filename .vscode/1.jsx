import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Heart, Shield, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const commonSymptoms = [
    { id: 'headache', name: 'Headache', icon: '🤕' },
    { id: 'fever', name: 'Fever', icon: '🌡️' },
    { id: 'cough', name: 'Cough', icon: '😷' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴' },
    { id: 'nausea', name: 'Nausea', icon: '🤢' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const matchedSymptom = commonSymptoms.find(
        s => s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchedSymptom) {
        navigate(`/symptom/${matchedSymptom.id}`);
      } else {
        toast.info(`Searching for: ${searchQuery}`);
        setTimeout(() => {
          navigate(`/symptom/fever`);
        }, 500);
      }
    } else {
      toast.error('Please enter a symptom to search');
    }
  };

  const handleSymptomClick = (symptomId) => {
    navigate(`/symptom/${symptomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Brand & Info */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary font-display tracking-tight">
                SymptomsGuide
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/80 font-medium">
                Your Trusted companion for
              </p>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Understanding symptoms and finding the right care
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-4">
              <div className="flex items-center gap-2 text-foreground/70">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Trusted Info</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm">Care Focused</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">24/7 Access</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">Expert Backed</span>
              </div>
            </div>
          </div>

          {/* Right Side - Search Card */}
          <div>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-large p-8 sm:p-10">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground font-display">
                    How are you feeling today?
                  </h2>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Describe your symptoms (e.g., headache, fever)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14 pr-12 text-base bg-background/50 border-border focus:border-primary transition-smooth"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft hover:shadow-medium"
                  >
                    Search Symptoms
                  </Button>
                </form>

                <div className="space-y-4">
                  <h3 className="text-center text-lg font-medium text-foreground">
                    Common Symptoms
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {commonSymptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => handleSymptomClick(symptom.id)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-gradient-card border border-border/50 transition-smooth hover:shadow-soft hover:scale-105 active:scale-95"
                      >
                        <span className="text-2xl">{symptom.icon}</span>
                        <span className="text-sm font-medium text-foreground">{symptom.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-3">
              Why Choose SymptomsGuide?
            </h2>
            <p className="text-muted-foreground text-lg">
              Your health companion, every step of the way
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-medium transition-smooth">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Easy Search</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quickly find information about any symptom with our intuitive search
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-medium transition-smooth">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Trusted Sources</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All information backed by medical professionals and research
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-medium transition-smooth">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Care Guidance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get practical advice and remedies for common symptoms
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-medium transition-smooth">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">24/7 Available</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access health information whenever you need it, day or night
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-6 bg-muted/30 border-border/50">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Medical Disclaimer:</strong> This tool is for informational purposes only and does not constitute medical advice. 
              Always consult with a healthcare professional for proper diagnosis and treatment.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};