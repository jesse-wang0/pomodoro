import React, { useEffect } from "react";

function HeaderInfo() {

  const getSessions = async () => {
    try {
      const dayResponse = await fetch("http://localhost:5000/test/day");
      const dayArray = await dayResponse.json();
      const dayCount = dayArray.length;
      console.log('Day:', dayCount);

      let dayTime = 0;
      for (let i = 0; i < dayCount; i++) {
        dayTime += dayArray[i].duration;
      }
      dayTime = Math.round(dayTime / 60 * 100) / 100;
      console.log('Hours (Day):', dayTime);

      const weekResponse = await fetch("http://localhost:5000/test/week");
      const weekArray = await weekResponse.json();
      const weekCount = weekArray.length;
      console.log('Week:', weekCount);

      let weekTime = 0;
      for (let i = 0; i < weekCount; i++) {
        weekTime += weekArray[i].duration;
      }
      weekTime = Math.round(weekTime / 60 * 100) / 100;
      console.log('Hours (Week):', weekTime);

      
      const monthResponse = await fetch("http://localhost:5000/test/month");
      const monthArray = await monthResponse.json();
      const monthCount = monthArray.length;
      console.log('Month:', monthCount);

      let monthTime = 0;
      for (let i = 0; i < monthCount; i++) {
        monthTime += monthArray[i].duration;
      }
      monthTime = Math.round(monthTime / 60 * 100) / 100;
      console.log('Hours (Month):', monthTime);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className="header-info">

    </div>
  );
}

export default HeaderInfo;