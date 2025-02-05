import React from "react";
import VisitPlanCard from "./visitPlanCard";
function VisitPlan({ trip }) {
  return (
    <div className="mt-8">
      <h1 className="px-2 py-1 font-bold text-xl md:text-2xl text-[#FF6B08]">
        Places to Visit
      </h1>

      {trip?.generatedTrip?.itinerary?.map((item, index) => (
        <div key={index} className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg md:text-xl p-2 text-gray-300">
            🌴 {item.day}
          </h2>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {item.activities.map((activity, index) => (
              <VisitPlanCard activity={activity} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VisitPlan;
