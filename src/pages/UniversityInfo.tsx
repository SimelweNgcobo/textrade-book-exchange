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
      </CampusLayout>
    </>
  );
};

export default UniversityInfo;
