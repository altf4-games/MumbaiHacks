import React, { useState } from 'react';
import { IoOptionsOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tooltip } from "@mui/material"; // For better descriptions

function TwoColumnForm() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [campaignDetails, setCampaignDetails] = useState(null);
  const { control, handleSubmit, watch } = useForm();
  const selectedTemplate = watch("promptTemplate", "Billboard in a city");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Send data to the backend
    try {
      const response = await fetch("http://localhost:3000/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Response from server:", result);
      setCampaignDetails(result.details); // Store campaign details in state
    } catch (error) {
      console.error("Error submitting campaign data:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full   bg-black p-4 overflow-hidden">
      {/* Left side - Form */}
      <div
        className={`bg-gray-100/20 h-full p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? 'md:w-2/5' : 'md:w-[75px]'
        } w-full`}
      >
        <h2
          onClick={() => setIsOpen((prev) => !prev
            
            
          )}
          className="text-2xl font-bold mb-4 cursor-pointer flex items-center justify-start"
        >
          <IoOptionsOutline size={35} color='white' />
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Company Name */}
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Company Name"
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                           duration-300 placeholder-gray-400"
                required
              />
            )}
          />

          {/* Product Name */}
          <Controller
            name="product"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Product Name"
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                           duration-300 placeholder-gray-400"
                required
              />
            )}
          />

          {/* Target Audience */}
          <Controller
            name="targetAudience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Target Audience"
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                           duration-300 placeholder-gray-400"
                required
              />
            )}
          />

          {/* Campaign Goal with Tooltip */}
          <Controller
            name="campaignGoal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Tooltip title="Define the main objective, like increasing brand awareness, driving sales, or promoting a new product">
                <input
                  {...field}
                  type="text"
                  placeholder="Campaign Goal"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                             focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                             duration-300 placeholder-gray-400"
                  required
                />
              </Tooltip>
            )}
          />

          {/* Tone Selection */}
          <Controller
            name="tone"
            control={control}
            defaultValue="Professional"
            render={({ field }) => (
              <select {...field} className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                       focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                       duration-300">
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Humorous">Humorous</option>
                <option value="Inspirational">Inspirational</option>
              </select>
            )}
          />

          {/* Call to Action Link */}
          <Controller
            name="callToActionLink"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Call to Action Link"
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                           duration-300 placeholder-gray-400"
                required
              />
            )}
          />

          {/* Campaign Date */}
          <Controller
            name="campaignDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Select Campaign Date"
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                           duration-300"
              />
            )}
          />

          {/* Prompt Template */}
          <Controller
            name="promptTemplate"
            control={control}
            defaultValue="Billboard in a city"
            render={({ field }) => (
              <select {...field} className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                       focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                       duration-300">
                <option value="Billboard in a city">Billboard in a city</option>
                <option value="Social media post">Social media post</option>
                <option value="Magazine ad">Magazine ad</option>
                <option value="Product packaging">Product packaging</option>
                <option value="Custom">Custom</option>
              </select>
            )}
          />

          {/* Custom Prompt Text Area */}
          {selectedTemplate === "Custom" && (
            <Controller
              name="customPrompt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Enter custom prompt details"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm
                             focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition
                             duration-300 placeholder-gray-400"
                ></textarea>
              )}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition duration-300"
          >
            Generate Campaign
          </button>
        </form>

        {/* Display campaign details after submission */}
        {campaignDetails && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
            <p className="mb-2">Text: {campaignDetails.text}</p>
            <p className="mb-2">Best Time to Campaign: {campaignDetails.bestCampaignTime}</p>
            <p className="mb-2">Current Festival: {campaignDetails.currentFestival}</p>
            {campaignDetails.imageBase64 && (
              <img
                src={campaignDetails.imageBase64}
                alt="Campaign"
                className="mt-4 rounded-lg"
              />
            )}
          </div>
        )}
      </div>

      {/* Right side - Empty div */}
      <div className="flex-1 w-full relative flex items-center justify-center bg-gray-100/20 rounded-lg shadow-lg ml-6">
        {/* Empty Space */}
        <div className='absolute bottom-2 right-2 rounded-full py-1 pb-1.5 shadow-xl
         px-4 text-xl flex items-center justify-center
          text-teal-400 font-semibold hover:bg-white/40 transition hover:cursor-pointer 
          bg-white/20'
        >
          Share
        </div>
      </div>
    </div>
  );
}

export default TwoColumnForm;