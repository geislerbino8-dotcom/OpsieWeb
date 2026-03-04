import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import PartnersImage from "../../assets/visuals/Partners.png";

function PartnerSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">

      {/* Top Section Card */}
      <div className="mb-8">
        <TopSectionCard secName="Products" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          PARTNERS AND CLIENTS
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, laboriosam.
        </p>
      </div>

      {/* Partners Content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">

        {/* Partner Image */}
        <div className="flex justify-center md:w-1/2">
          <img src={PartnersImage} alt="Partners" className="w-full max-w-xs object-contain rounded-lg shadow-md" />
        </div>

        {/* Description */}
        <div className="flex-1 text-gray-700 leading-relaxed">
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque nostrum sunt soluta explicabo nulla incidunt nobis dicta molestias. Nobis accusamus numquam a excepturi distinctio temporibus veritatis, doloribus porro quis?
          </p>
          <p className="mb-4">
            Repudiandae pariatur eligendi omnis repellendus a laborum, maxime molestiae quis ex ipsum quo est adipisci facere porro officia enim ipsam ducimus quas totam nesciunt? Atque repudiandae modi id quae magni.
          </p>
          <p>
            Dolor obcaecati consequuntur adipisci sit doloribus illo, hic vel laborum veritatis ad accusantium cumque eos enim vero tenetur non ex! Illum accusantium fugit sit maiores suscipit voluptas ullam temporibus dolore.
          </p>
        </div>

      </div>

    </section>
  );
}

export default PartnerSection;