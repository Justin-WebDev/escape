import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent, useContext } from "react";
import { OnlinePlayContext } from "../../OnlinePlayContext";
import CreateNewRoom from "../CreateNewRoom";

import Room from "./Room";

const GameRooms: FunctionComponent<RouteComponentProps> = () => {
  const { rooms } = useContext(OnlinePlayContext);

  return (
    // <div className="roomsContainer">
    //   <div className="roomHeader">
    //     <div style={{ gridColumn: "1", textAlign: "center" }}>Room</div>
    //     <div style={{ gridColumn: "2", textAlign: "center" }}>Size</div>
    //     <div style={{ gridColumn: "3", textAlign: "center" }}>Players</div>
    //     <div style={{ gridColumn: "4", textAlign: "center" }}>Watching</div>
    //     <div style={{ gridColumn: "5", textAlign: "center" }}>Status</div>
    //   </div>
    //   {Object.keys(rooms).map((roomName, index) => {
    //     return <Room roomName={roomName} index={index} />;
    //   })}
    //   <CreateNewRoom />
    // </div>
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Room
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Players
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Watching
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Jane Cooper
                        </div>
                        <div className="text-sm text-gray-500">
                          jane.cooper@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Regional Paradigm Technician
                    </div>
                    <div className="text-sm text-gray-500">Optimization</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="/"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>

                {/* More items... */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRooms;
