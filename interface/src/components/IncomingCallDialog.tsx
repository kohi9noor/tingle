import React from "react";

interface IncomingCallDialogProps {
  callType: string;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallDialog: React.FC<IncomingCallDialogProps> = ({
  callType,
  onAccept,
  onReject,
}) => {
  console.log(callType);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Incoming {callType} Call</h2>
        <p className="mb-6">Someone is calling you. Do you want to answer?</p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
