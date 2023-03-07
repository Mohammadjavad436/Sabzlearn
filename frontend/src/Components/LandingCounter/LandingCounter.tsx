import React, { useEffect, useState, memo } from "react";

type LandingCounterProp = {
  count: number | undefined;
};

export default memo(function LandingCounter({
  count,
}: LandingCounterProp): JSX.Element {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCourseCounter((prevCount) => prevCount + 1);
    }, 10);

    if (courseCounter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [courseCounter]);

  return <span className="landing-status__count">{courseCounter}</span>;
});
