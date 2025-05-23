import React, { useState } from "react";


function App() {
  const [formData, setFormData] = useState({
    정가: "",
    품질: "",
    출판사: "",
    출판일:"",
    제본방식: "",
    페이지수: "",
    책무게_g: "",
    가로_mm: "",
    세로_mm: "",
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`예측된 가격: ${result.prediction}`);
      } else {
        alert(`에러: ${result.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("예측 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="app-container">
      <h1>중고 도서 가격 예측</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type={["정가", "페이지수", "책무게_g", "가로_mm", "세로_mm"].includes(key) ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">예측 요청</button>
      </form>
    </div>
  );
}

export default App;
