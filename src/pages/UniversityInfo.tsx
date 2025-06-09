import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusLayout from "@/components/CampusLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, BookOpen } from "lucide-react";

const UniversityInfo = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <SEO
        title="ReBooked Campus - Explore South African Universities"
        description="Your trusted student guide for finding the right place to study. Discover accredited universities, programs, and resources tailored for South African students."
        keywords="South African universities, university guide, student resources, education"
        url="https://www.rebookedsolutions.co.za/university-info"
      />

      <CampusLayout>
        <section
          style={{
            paddingBottom: "80px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "80px",
            position: "relative",
            backgroundColor: "rgb(230, 244, 234)",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1152px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "60px",
                  fontWeight: "700",
                  lineHeight: "60px",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                <span>Explore South Africa's </span>
                <span
                  style={{
                    color: "rgb(21, 115, 71)",
                    fontSize: "60px",
                    fontWeight: "700",
                    lineHeight: "60px",
                    textAlign: "center",
                  }}
                >
                  Universities with Ease
                </span>
              </h1>
              <p
                style={{
                  color: "rgb(55, 65, 81)",
                  fontSize: "24px",
                  lineHeight: "32px",
                  marginBottom: "32px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "768px",
                  textAlign: "center",
                }}
              >
                Your trusted student guide for finding the right place to study.
                Discover accredited universities, programs, and resources
                tailored for South African students.
              </p>
            </div>
            <div
              style={{
                marginBottom: "48px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "672px",
                textAlign: "center",
              }}
            >
              <form
                onSubmit={handleSearch}
                style={{
                  display: "flex",
                  gap: "8px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flexBasis: "0%",
                    flexGrow: "1",
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  <Search
                    style={{
                      color: "rgb(156, 163, 175)",
                      height: "24px",
                      left: "12px",
                      position: "absolute",
                      top: "50%",
                      width: "24px",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Search by university name, location, or program..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      borderWidth: "2px",
                      borderColor: "rgb(229, 231, 235)",
                      color: "rgb(17, 24, 39)",
                      fontSize: "14px",
                      height: "40px",
                      paddingBottom: "12px",
                      paddingLeft: "40px",
                      paddingRight: "16px",
                      paddingTop: "12px",
                      width: "100%",
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgb(21, 115, 71)",
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                    color: "rgb(255, 255, 255)",
                    cursor: "pointer",
                    display: "flex",
                    fontSize: "14px",
                    fontWeight: "500",
                    gap: "8px",
                    height: "40px",
                    justifyContent: "center",
                    paddingBottom: "8px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    paddingTop: "8px",
                    whiteSpace: "nowrap",
                    border: "none",
                  }}
                >
                  Search
                </Button>
              </form>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                marginBottom: "64px",
                textAlign: "center",
              }}
            >
              <Button
                onClick={() => navigate("/university-info")}
                style={{
                  alignItems: "center",
                  backgroundColor: "rgb(21, 115, 71)",
                  borderRadius: "10px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  color: "rgb(255, 255, 255)",
                  cursor: "pointer",
                  display: "inline-flex",
                  fontSize: "18px",
                  fontWeight: "500",
                  gap: "8px",
                  height: "40px",
                  justifyContent: "center",
                  paddingBottom: "16px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  paddingTop: "16px",
                  whiteSpace: "nowrap",
                  border: "none",
                }}
              >
                <Book
                  style={{
                    height: "24px",
                    marginRight: "8px",
                    width: "24px",
                  }}
                />
                <span>Browse Universities</span>
              </Button>
              <Button
                onClick={() => navigate("/university-info?tool=bursaries")}
                style={{
                  alignItems: "center",
                  backgroundColor: "rgb(21, 115, 71)",
                  borderRadius: "10px",
                  borderWidth: "2px",
                  borderColor: "rgb(21, 115, 71)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  color: "rgb(255, 255, 255)",
                  cursor: "pointer",
                  display: "inline-flex",
                  fontSize: "18px",
                  fontWeight: "500",
                  gap: "8px",
                  height: "40px",
                  justifyContent: "center",
                  paddingBottom: "16px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  paddingTop: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                <BookOpen
                  style={{
                    height: "24px",
                    marginRight: "8px",
                    width: "24px",
                  }}
                />
                <span>Scholarships & Resources</span>
              </Button>
            </div>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "896px",
                position: "relative",
                textAlign: "center",
              }}
            >
              <img
                alt="South African students studying"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&crop=center"
                style={{
                  borderRadius: "16px",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                  height: "384px",
                  maxWidth: "100%",
                  objectFit: "cover",
                  textAlign: "center",
                  width: "100%",
                }}
              />
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
                  borderRadius: "16px",
                  bottom: "0px",
                  left: "0px",
                  position: "absolute",
                  right: "0px",
                  textAlign: "center",
                  top: "0px",
                }}
              />
            </div>
          </div>
        </section>
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
