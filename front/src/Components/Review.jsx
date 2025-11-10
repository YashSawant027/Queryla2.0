import React from "react";
import user1 from '../assets/user/1.png';
import user2 from '../assets/user/2.png';
import user3 from '../assets/user/3.png';
import user4 from '../assets/user/4.png';
import user5 from '../assets/user/5.png';
import user6 from '../assets/user/6.png';
import user7 from '../assets/user/7.png';
import user8 from '../assets/user/8.png';
import user9 from '../assets/user/9.png';
import {TicketCheck} from 'lucide-react'

function Review() {

  return (
    <section className="w-full min-h-screen  py-20 px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-3">
          Hear It from Our Users
        </h2>
        <p className="text-center mt-5 text-gray-600 text-base md:text-lg">
          Discover what industry leaders and professionals say about{" "}
          <span className="font-semibold text-indigo-700">DataQuery AI</span>:
        </p>
        <div class="md:mt-20 mt-5 grid md:grid-flow-col grid-rows-7 gap-4">
          <div class="row-span-3 white shadow-xl p-5 rounded-[10px] flex justify-center items-center">
            <div>
              <h2 className=" font-sans">"SQL is hard. Giving context to the AI of your schemas and what database you're working with has given me excellent results. Love to see this being automated by Queryla AI.”
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user1} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900">Guillermo Rauch</p><TicketCheck size={15}/>
                </div>
                <p className="">rauchg — CEO of Vercel</p>
              </div>

            </div>
            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">
            <h2>"En scrollant sur mon Instagram, je suis tombée sur Queryla AI: la plateforme AI qui permet de rédiger des requêtes SQL via le langage naturel.”
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user2} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900">Jilda Joseph-Angélique</p><TicketCheck size={15}/>
                </div>
                <p>Data Analyst</p>
              </div>

            </div>
          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

            <h2>"Why get scared of AI? In fact, leverage it. Queryla AI is the holy grail of 'all things data' — getting insights in seconds is amazing 🚀”
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user3} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Neema Madayi Veetil</p><TicketCheck size={15}/>
                </div>
                
                <p>Analytics </p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

            <h2>"If you’re bored of typing SQL queries manually, you must try Queryla AI! It saves time and helps you focus on insights.",
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user4} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Dheeraj Tuteja</p><TicketCheck size={15}/>
                </div>
                
                <p>Data Visualization Lead</p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

          <h2>"Queryla AI is a powerful tool to generate SQL in minutes. I love how I don’t need to spend hours understanding and writing queries anymore 😄"
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user5} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Vibhu Sagar</p><TicketCheck size={15}/>
                </div>
                
                <p>AI Tools Expert</p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

            <h2>"Transforming natural language questions into SQL queries has never been easier. Thanks to Queryla AI!"
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user6} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >M. Nasir Yousufzai</p><TicketCheck size={15}/>
                </div>
                
                <p>Cloud Native Engineer</p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

          <h2>“Ready to level up your SQL skills? Text2SQL: Embrace AI to generate SQL queries ➡️ Queryla AI. Happy learning and exploring!”,
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user7} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Sadie St. Lawrence</p><TicketCheck size={15}/>
                </div>
                
                <p>Founder/CEO</p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">

          <h2>“Je viens de découvrir un outil incroyable appelé Queryla qui utilise l'intelligence artificielle pour convertir des phrases en langage naturel en requêtes SQL”,
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user8} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Cédric Cazal</p><TicketCheck size={15}/>
                </div>
                
                <p>NoCode Product Builder</p>
              </div>

            </div>

          </div>
          <div class="row-span-2 bg-white shadow-xl p-5 rounded-[10px]">
            <h2>“Gone are the days of struggling with complex SQL syntax! With Queryla, writing SQL queries has become a breeze”
            </h2>
            <div className="flex gap-4 mt-3">
              <img src={user9} alt="" className="w-[50px] rounded-[50%]"/>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <p className="font-medium text-blue-900"  >Ankit pangas</p><TicketCheck size={15}/>
                </div>
                
                <p>Senior Software Engineer</p>
              </div></div>
            
          </div>
        </div>
      </div>
    </section>


  );
}

export default Review;
