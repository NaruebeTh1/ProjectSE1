import { ExportParcelList, ImportParcelList, ParcelList, PickUpParcelList } from "../../interfaces";

const apiUrl = "http://localhost:8080";

async function GetParcelType() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/parcelTypes`, requestOptions)
      .then((response) => response.json())
      .then(({ data }) => (data ? data : false));
  
    return res;
}

async function GetRoom() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/rooms`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetPersonnel() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/personnelsP`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}


async function GetParcelUnit() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/parcelUnits`, requestOptions)
      .then((response) => response.json())
      .then(({ data }) => (data ? data : false));
  
    return res;
}


async function GetParcelList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/parcelLists`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetImportParcelList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/importparcelLists`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}


async function DeleteParcelListByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/parcelList/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetParcelListById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/parcelList/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetImportParcelListByParcelListId(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/getListImportParcel/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
} 

async function CreateParcelList(data: ParcelList) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/parcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function CreateImportParcelList(data: ImportParcelList) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/importparcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetImportParcelListById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/importparcelLists/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


async function UpdateParcelList(data: ParcelList) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/parcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


/*ระบบเบิกจ่ายพัสดุ*/ 

async function GetPickUpParcelList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/pickUpParcelLists`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetPickUpParcelListByPickUpStatusId1() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/pickUpParcelListsByStatusId1`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetPickUpParcelListByPickUpStatusId2() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/pickUpParcelListsByStatusId2`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetPickUpParcelListById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/pickUpParcelLists/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPickUpStatus() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/pickUpstatuses`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function GetExportParcelList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/exportparcelLists`, requestOptions)
    .then((response) => response.json())
    .then(({ data }) => (data ? data : false));

  return res;
}

async function CreateExportParcelList(data: ExportParcelList) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/exportparcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


async function CreatePickUpParcelListPUP(data: PickUpParcelList) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/pickUpParcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


async function UpdatePickUpParcelList(data: PickUpParcelList) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/pickUpParcelLists`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


async function DeletePickUpParcelListByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/pickUpParcelLists/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}



export {
  //ระบบจัดการข้อมูลพัสดุ
    GetParcelType,
    GetParcelUnit,
    GetParcelList,
    DeleteParcelListByID,
    GetParcelListById,
    CreateParcelList,
    UpdateParcelList,
    CreateImportParcelList,
    GetImportParcelListById,
    GetImportParcelList,
    GetImportParcelListByParcelListId,
    
  //ระบบเบิกจ่ายพัสดุ
    GetPickUpParcelListByPickUpStatusId1,
    GetPickUpParcelListByPickUpStatusId2,
    GetPickUpParcelList,
    GetPickUpParcelListById,
    GetPickUpStatus,
    CreatePickUpParcelListPUP,
    UpdatePickUpParcelList,
    DeletePickUpParcelListByID,
    GetExportParcelList,
    CreateExportParcelList,
    
    GetPersonnel,
    GetRoom,
};