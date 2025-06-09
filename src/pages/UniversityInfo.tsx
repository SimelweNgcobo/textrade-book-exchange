import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusLayout from "@/components/CampusLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, BookOpen, ExternalLink, User } from "lucide-react";

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

        {/* Popular Universities Section */}
        <section
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            paddingBottom: "64px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "64px",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1152px",
            }}
          >
            <div
              style={{
                marginBottom: "48px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "36px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Popular Universities
              </h2>
              <p
                style={{
                  color: "rgb(75, 85, 99)",
                  fontSize: "18px",
                  lineHeight: "28px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "672px",
                  textAlign: "center",
                }}
              >
                Explore some of South Africa's most prestigious institutions of
                higher learning
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gap: "24px",
                gridTemplate: "none / repeat(2, minmax(0px, 1fr))",
                marginBottom: "48px",
              }}
            >
              {/* UCT Card */}
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "12px",
                  borderWidth: "2px",
                  borderColor: "rgb(243, 244, 246)",
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "16px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "24px",
                  }}
                >
                  <div
                    style={{
                      alignItems: "flex-start",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        alt="University of Cape Town logo"
                        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&h=200&fit=crop&crop=center"
                        style={{
                          borderRadius: "12px",
                          height: "48px",
                          maxWidth: "100%",
                          objectFit: "cover",
                          width: "48px",
                        }}
                      />
                      <div
                        style={{
                          marginLeft: "12px",
                        }}
                      >
                        <h3
                          style={{
                            color: "rgb(17, 24, 39)",
                            fontSize: "18px",
                            fontWeight: "600",
                            lineHeight: "28px",
                          }}
                        >
                          UCT
                        </h3>
                        <p
                          style={{
                            color: "rgb(75, 85, 99)",
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          Cape Town, Western Cape
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(230, 244, 234)",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Public
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                >
                  <h4
                    style={{
                      color: "rgb(17, 24, 39)",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    University of Cape Town
                  </h4>
                  <p
                    style={{
                      color: "rgb(75, 85, 99)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      marginBottom: "12px",
                    }}
                  >
                    The University of Cape Town is the oldest university in
                    South Africa and has a long tradition of academic
                    excellence. Located beneath the iconic Table Mountain, UCT
                    is consistently ranked as the top university in Africa and
                    is globally recognized for its research output and academic
                    standards.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Medicine
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Engineering
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Business
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      +7 more
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      color: "rgb(107, 114, 128)",
                      display: "flex",
                      fontSize: "14px",
                      justifyContent: "space-between",
                      lineHeight: "20px",
                    }}
                  >
                    <span>Est. 1829</span>
                    <span>29,000+ students</span>
                  </div>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    borderColor: "rgb(243, 244, 246)",
                    borderTop: "1px solid rgb(243, 244, 246)",
                    display: "flex",
                    gap: "8px",
                    paddingBottom: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "16px",
                  }}
                >
                  <Button
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
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      width: "100%",
                      flex: 1,
                      border: "none",
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(45, 55, 72)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "36px",
                      justifyContent: "center",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                    }}
                  >
                    <ExternalLink
                      style={{
                        height: "16px",
                        width: "16px",
                      }}
                    />
                  </Button>
                </div>
              </div>

              {/* Wits Card */}
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "12px",
                  borderWidth: "2px",
                  borderColor: "rgb(243, 244, 246)",
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "16px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "24px",
                  }}
                >
                  <div
                    style={{
                      alignItems: "flex-start",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        alt="University of the Witwatersrand logo"
                        src="https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=200&h=200&fit=crop&crop=center"
                        style={{
                          borderRadius: "12px",
                          height: "48px",
                          maxWidth: "100%",
                          objectFit: "cover",
                          width: "48px",
                        }}
                      />
                      <div
                        style={{
                          marginLeft: "12px",
                        }}
                      >
                        <h3
                          style={{
                            color: "rgb(17, 24, 39)",
                            fontSize: "18px",
                            fontWeight: "600",
                            lineHeight: "28px",
                          }}
                        >
                          Wits
                        </h3>
                        <p
                          style={{
                            color: "rgb(75, 85, 99)",
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          Johannesburg, Gauteng
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(230, 244, 234)",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Public
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                >
                  <h4
                    style={{
                      color: "rgb(17, 24, 39)",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    University of the Witwatersrand
                  </h4>
                  <p
                    style={{
                      color: "rgb(75, 85, 99)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      marginBottom: "12px",
                    }}
                  >
                    The University of the Witwatersrand, Johannesburg, is a
                    multi-campus South African public research university
                    situated in the northern areas of central Johannesburg.
                    Known worldwide for excellence in mining engineering,
                    business, and medical research.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Mining Engineering
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Medicine
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      Business
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(21, 115, 71)",
                        display: "flex",
                        fontSize: "12px",
                        fontWeight: "600",
                        lineHeight: "16px",
                        paddingBottom: "2px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "2px",
                      }}
                    >
                      +6 more
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      color: "rgb(107, 114, 128)",
                      display: "flex",
                      fontSize: "14px",
                      justifyContent: "space-between",
                      lineHeight: "20px",
                    }}
                  >
                    <span>Est. 1922</span>
                    <span>40,000+ students</span>
                  </div>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    borderColor: "rgb(243, 244, 246)",
                    borderTop: "1px solid rgb(243, 244, 246)",
                    display: "flex",
                    gap: "8px",
                    paddingBottom: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "16px",
                  }}
                >
                  <Button
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
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      width: "100%",
                      flex: 1,
                      border: "none",
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(45, 55, 72)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "36px",
                      justifyContent: "center",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                    }}
                  >
                    <ExternalLink
                      style={{
                        height: "16px",
                        width: "16px",
                      }}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div
              style={{
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
                  height: "40px",
                  justifyContent: "center",
                  paddingBottom: "16px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  paddingTop: "16px",
                  border: "none",
                }}
              >
                View All Universities
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose ReBooked Solutions Section */}
        <section
          style={{
            paddingBottom: "64px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "64px",
            backgroundColor: "rgb(230, 244, 234)",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1152px",
            }}
          >
            <div
              style={{
                marginBottom: "48px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "36px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Why Choose ReBooked Solutions?
              </h2>
              <p
                style={{
                  color: "rgb(75, 85, 99)",
                  fontSize: "18px",
                  lineHeight: "28px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "672px",
                  textAlign: "center",
                }}
              >
                We make finding the right university simple, accessible, and
                affordable for all South African students
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gap: "32px",
                gridTemplate: "none / repeat(3, minmax(0px, 1fr))",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  paddingBottom: "24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgb(21, 115, 71)",
                    borderRadius: "9999px",
                    display: "flex",
                    height: "64px",
                    justifyContent: "center",
                    marginBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "64px",
                  }}
                >
                  <Search
                    style={{
                      color: "rgb(255, 255, 255)",
                      height: "24px",
                      width: "24px",
                    }}
                  />
                </div>
                <h3
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  Easy Search & Discovery
                </h3>
                <p
                  style={{
                    color: "rgb(75, 85, 99)",
                    textAlign: "center",
                  }}
                >
                  Find universities by location, programs, or specific
                  requirements with our intuitive search tools.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  paddingBottom: "24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgb(21, 115, 71)",
                    borderRadius: "9999px",
                    display: "flex",
                    height: "64px",
                    justifyContent: "center",
                    marginBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "64px",
                  }}
                >
                  <BookOpen
                    style={{
                      color: "rgb(255, 255, 255)",
                      height: "24px",
                      width: "24px",
                    }}
                  />
                </div>
                <h3
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  Comprehensive Information
                </h3>
                <p
                  style={{
                    color: "rgb(75, 85, 99)",
                    textAlign: "center",
                  }}
                >
                  Access detailed profiles, programs, admission requirements,
                  and campus information for each university.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  paddingBottom: "24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgb(21, 115, 71)",
                    borderRadius: "9999px",
                    display: "flex",
                    height: "64px",
                    justifyContent: "center",
                    marginBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "64px",
                  }}
                >
                  <User
                    style={{
                      color: "rgb(255, 255, 255)",
                      height: "24px",
                      width: "24px",
                    }}
                  />
                </div>
                <h3
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  Student-Focused Resources
                </h3>
                <p
                  style={{
                    color: "rgb(75, 85, 99)",
                    textAlign: "center",
                  }}
                >
                  Get guidance on scholarships, NSFAS funding, application
                  processes, and student life in South Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Resources & Guides Section */}
        <div
          style={{
            backgroundColor: "rgb(230, 244, 234)",
            minHeight: "910px",
            paddingBottom: "32px",
            paddingTop: "32px",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1280px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <div
              style={{
                marginBottom: "48px",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "36px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Student Resources & Guides
              </h1>
              <p
                style={{
                  color: "rgb(75, 85, 99)",
                  fontSize: "18px",
                  lineHeight: "28px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "768px",
                  textAlign: "center",
                }}
              >
                Everything you need to know about studying in South Africa. From
                funding and applications to student life and career guidance.
              </p>
            </div>
            <section
              style={{
                marginBottom: "64px",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "36px",
                  }}
                >
                  Featured Guides
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "32px",
                  gridTemplate: "none / repeat(1, minmax(0px, 1fr))",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="Complete Guide to NSFAS Applications for 2024"
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "192px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div
                      style={{
                        left: "16px",
                        position: "absolute",
                        top: "16px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          backgroundColor: "rgb(21, 115, 71)",
                          borderRadius: "9999px",
                          color: "rgb(255, 255, 255)",
                          display: "inline-flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Featured
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Financial Aid
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        8 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "20px",
                        fontWeight: "600",
                        letterSpacing: "-0.5px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      Complete Guide to NSFAS Applications for 2024
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        marginBottom: "16px",
                      }}
                    >
                      Everything you need to know about applying for NSFAS
                      funding, including eligibility requirements, required
                      documents, and application deadlines.
                    </p>
                    <Button
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
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                        border: "none",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read Guide</span>
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="How to Choose the Right University in South Africa"
                      src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "192px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div
                      style={{
                        left: "16px",
                        position: "absolute",
                        top: "16px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          backgroundColor: "rgb(21, 115, 71)",
                          borderRadius: "9999px",
                          color: "rgb(255, 255, 255)",
                          display: "inline-flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Featured
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        University Selection
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        6 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "20px",
                        fontWeight: "600",
                        letterSpacing: "-0.5px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      How to Choose the Right University in South Africa
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        marginBottom: "16px",
                      }}
                    >
                      A comprehensive guide to selecting the perfect university
                      based on your career goals, budget, and personal
                      preferences.
                    </p>
                    <Button
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
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                        border: "none",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read Guide</span>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  paddingBottom: "24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "24px",
                }}
              >
                <h3
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    marginBottom: "16px",
                  }}
                >
                  Browse by Category
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgb(21, 115, 71)",
                      color: "rgb(21, 115, 71)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    All Categories
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(55, 65, 81)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Financial Aid
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(55, 65, 81)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    University Selection
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(55, 65, 81)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Student Life
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(55, 65, 81)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Applications
                  </Button>
                  <Button
                    style={{
                      alignItems: "center",
                      backgroundColor: "rgb(233, 236, 251)",
                      borderRadius: "10px",
                      borderWidth: "1px",
                      borderColor: "rgba(21, 115, 71, 0.2)",
                      color: "rgb(55, 65, 81)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "500",
                      height: "40px",
                      justifyContent: "center",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Study Tips
                  </Button>
                </div>
              </div>
            </section>
            <section>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    color: "rgb(17, 24, 39)",
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "36px",
                  }}
                >
                  All Resources
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "24px",
                  gridTemplate: "none / repeat(2, minmax(0px, 1fr))",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="Student Accommodation Options in Major SA Cities"
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "160px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Student Life
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        5 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: "-0.45px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      Student Accommodation Options in Major SA Cities
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        marginBottom: "16px",
                      }}
                    >
                      Explore different housing options for university students,
                      from on-campus residences to private accommodation and
                      budget-friendly alternatives.
                    </p>
                    <Button
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(233, 236, 251)",
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(45, 55, 72)",
                        cursor: "pointer",
                        display: "inline-flex",
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read More</span>
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="Understanding University Application Requirements"
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "160px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Applications
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        7 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: "-0.45px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      Understanding University Application Requirements
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        marginBottom: "16px",
                      }}
                    >
                      Navigate the application process with confidence. Learn
                      about admission points, required subjects, and portfolio
                      requirements for different programs.
                    </p>
                    <Button
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(233, 236, 251)",
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(45, 55, 72)",
                        cursor: "pointer",
                        display: "inline-flex",
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read More</span>
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="Scholarship Opportunities for South African Students"
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "160px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Financial Aid
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        9 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: "-0.45px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      Scholarship Opportunities for South African Students
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        marginBottom: "16px",
                      }}
                    >
                      Discover various scholarship programs available to South
                      African students, including merit-based, need-based, and
                      industry-specific awards.
                    </p>
                    <Button
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(233, 236, 251)",
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(45, 55, 72)",
                        cursor: "pointer",
                        display: "inline-flex",
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read More</span>
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "12px",
                    borderWidth: "1px",
                    borderColor: "rgb(212, 232, 222)",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      alt="Preparing for University: Essential Study Skills"
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&crop=center"
                      style={{
                        height: "160px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          borderRadius: "9999px",
                          borderWidth: "1px",
                          borderColor: "rgba(21, 115, 71, 0.2)",
                          color: "rgb(21, 115, 71)",
                          display: "flex",
                          fontSize: "12px",
                          fontWeight: "600",
                          lineHeight: "16px",
                          paddingBottom: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                        }}
                      >
                        Study Tips
                      </div>
                      <span
                        style={{
                          color: "rgb(107, 114, 128)",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        6 min read
                      </span>
                    </div>
                    <h3
                      style={{
                        color: "rgb(45, 55, 72)",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: "-0.45px",
                        lineHeight: "28px",
                        marginTop: "6px",
                      }}
                    >
                      Preparing for University: Essential Study Skills
                    </h3>
                  </div>
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(75, 85, 99)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        marginBottom: "16px",
                      }}
                    >
                      Develop the academic skills you need to succeed at
                      university level, including time management, research
                      techniques, and exam strategies.
                    </p>
                    <Button
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgb(233, 236, 251)",
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderColor: "rgba(21, 115, 71, 0.2)",
                        color: "rgb(45, 55, 72)",
                        cursor: "pointer",
                        display: "inline-flex",
                        fontSize: "14px",
                        fontWeight: "500",
                        gap: "8px",
                        height: "40px",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        width: "100%",
                      }}
                    >
                      <BookOpen
                        style={{
                          marginRight: "8px",
                          height: "16px",
                          width: "16px",
                        }}
                      />
                      <span>Read More</span>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "16px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                marginTop: "64px",
                paddingBottom: "32px",
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingTop: "32px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "30px",
                  fontWeight: "700",
                  lineHeight: "36px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Need Personalized Guidance?
              </h2>
              <p
                style={{
                  color: "rgb(75, 85, 99)",
                  fontSize: "18px",
                  lineHeight: "28px",
                  marginBottom: "24px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "672px",
                  textAlign: "center",
                }}
              >
                Our team of education consultants is here to help you navigate
                your university journey. Get personalized advice on university
                selection, applications, and funding options.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
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
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    whiteSpace: "nowrap",
                    border: "none",
                  }}
                >
                  <User
                    style={{
                      marginRight: "8px",
                      height: "16px",
                      width: "16px",
                    }}
                  />
                  <span>Contact an Advisor</span>
                </Button>
                <Button
                  onClick={() => navigate("/university-info")}
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
                    display: "flex",
                    fontSize: "14px",
                    fontWeight: "500",
                    gap: "8px",
                    height: "40px",
                    justifyContent: "center",
                    paddingBottom: "8px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Search
                    style={{
                      marginRight: "8px",
                      height: "16px",
                      width: "16px",
                    }}
                  />
                  <span>Find Universities</span>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
