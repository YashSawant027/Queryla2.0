import React from "react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/3d-scroll-trigger";
import sql from "../assets/database/mysql.png";
import mongodb from "../assets/database/mongodb.png";
import oracle from "../assets/database/oracle.png";
import postgre from "../assets/database/postgre.png";
import mariadb from "../assets/database/mariadb.png";

function Tools() {
  return (
    <div className="py-10 md:py-20 w-full max-w-[1220px] mx-auto mt-32 shadow-2xl px-6 sm:px-10 md:px-20 rounded-[10px]">
      <ThreeDScrollTriggerContainer>
        {/* Heading Section */}
        <div className="w-full text-center mb-10">
          <h1 className="text-[22px] md:text-[25px] font-medium text-gray-800">
            Our SQL AI supports
          </h1>
          <h2 className="text-[26px] sm:text-[30px] md:text-[35px] font-bold text-gray-900 leading-tight">
            All Major SQL and NoSQL Databases <br className="hidden md:block" />
            for AI Query Generation
          </h2>
          <p className="text-[14px] sm:text-[16px] text-gray-600 mt-2">
            Generate SQL for any database. Our LLM system understands <br className="hidden sm:block" />
            the specific syntax and features of each database system.
          </p>
        </div>

        {/* Logos Section */}
        <ThreeDScrollTriggerRow
          baseVelocity={5}
          direction={1}
          className="gap-10 overflow-hidden w-full bg-white flex flex-wrap justify-center items-center py-10"
        >
          {[sql, mongodb, postgre, oracle, mariadb].map((db, i) => (
            <div
              key={i}
              className="px-4 py-2 shadow-lg text-white rounded-lg ml-4 sm:ml-8 md:ml-12 lg:ml-24"
            >
              <img
                src={db}
                alt="database-logo"
                className="w-[60px] sm:w-20 md:w-[100px] h-auto object-contain"
              />
            </div>
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
}

export default Tools;
