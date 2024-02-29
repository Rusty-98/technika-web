import React, { useState, useEffect, useCallback } from "react";
import style from "./compstyles/team.module.css";
import Text from "./Text";
import TeamCardsEffect from "./TeamCardsEffect";
import Loader from "./Loader";

const Team = ({ showThreeDepartments }) => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/get-team");
  //       const data = await response.json();
  //       if (data.success) {
  //         setTeamData(data.TeamMembers);
  //       } else {
  //         console.error("Error fetching team data:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching team data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/get-team");
      const data = await response.json();
      if (data.success) {
        setTeamData(data.TeamMembers);
      } else {
        console.error("Error fetching team data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const departmentOrder = [
    "Student Secretary ",
    "Joint Secretary (Management)",
    "Joint Secretary (Technical)",
    "Events",
    "Web Development",
    "Social Media",
    "Content",
    "Marketing",
    "Publicity",
    "Design",
    "Public Relations",
    "Hospitality",
    "Logistics",
    "Photography",
    "Security",
  ];

  const uniqueDepartments = Array.from(new Set(teamData.map((member) => member.Department)))
    .sort((a, b) => {
      const indexOfA = departmentOrder.indexOf(a);
      const indexOfB = departmentOrder.indexOf(b);
      return indexOfA - indexOfB;
    });
  const departmentsToMap = showThreeDepartments ? uniqueDepartments.slice(0, 3) : uniqueDepartments;

  return (
    <div className={style.main}>
      <div className={style.top}>team</div>
      <div className={style.bottom}>
        {loading ? (
          <Loader />
        ) : (departmentsToMap.map((department, index) => (
          <div className={style.bt} key={index}>
            <div>
              {<Text prop={department === "Security" ? "Discipline & Protocol" : department} isStudentSec={department === 'Student Secretary '} />}
            </div>
            <div className={style.caraCont}>
              <TeamCardsEffect teamMembers={teamData.filter((member) => member.Department === department)} />
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Team;
