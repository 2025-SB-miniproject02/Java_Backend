import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from joblib import load # joblib을 사용하여 모델 로드
from datetime import datetime # datetime 모듈 임포트

app = Flask(__name__)
CORS(app) # 모든 경로에 대해 CORS 허용

# ⭐️ 현재 스크립트 파일의 디렉토리 경로를 가져옵니다.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ⭐️ 모델 파일들의 상대 경로를 구성합니다.
# BASE_DIR은 'C:\Users\Administrator\Mini_Project2\project_root\flask'가 됩니다.
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
LABEL_ENCODERS_PATH = os.path.join(BASE_DIR, "label_encoders.pkl")

# 모델과 라벨 인코더 로드 (앱 시작 시 한 번만 로드)
try:
    model = load(MODEL_PATH)
    label_encoders = load(LABEL_ENCODERS_PATH)
    print("모델과 라벨 인코더가 성공적으로 로드되었습니다.")
except Exception as e:
    print(f"모델 또는 라벨 인코더 로드 중 오류 발생: {e}")
    # 프로덕션 환경에서는 앱 시작을 중단하거나 적절한 오류 처리가 필요
    model = None
    label_encoders = None


@app.route('/predict', methods=['POST'])
def predict_price():
    if model is None or label_encoders is None:
        return jsonify({"error": "모델 또는 라벨 인코더가 로드되지 않았습니다."}), 500

    data = request.json
    print(f"--- Flask 수신 데이터: {data} ---") # 디버깅용
    
    # ⭐️ 필수 필드 검증 (이전과 동일)
    required_fields = [
        "정가", "품질", "출판사", "출판일", "제본방식",
        "페이지수", "책무게_g", "가로_mm", "세로_mm"
    ]
    for field in required_fields:
        if field not in data:
            print(f"--- 필수 필드 누락: {field} ---")
            return jsonify({"error": f"필수 필드 '{field}'가 누락되었습니다."}), 400

    try:
        # ⭐️ 입력 데이터 준비 및 타입 변환
        # '정가', '페이지수', '책무게_g', '가로_mm', '세로_mm'는 숫자형으로 변환
        # '출판일'은 날짜 문자열 -> 연도(int)로 변환
        # '품질', '제본방식'은 프론트에서 받은 값을 그대로 사용
        
        # '출판일' 처리: 'YYYY-MM-DD' 문자열을 연도(int)로 변환
        # ⚠️ 모델이 날짜를 '연도'가 아닌 다른 형태로 기대한다면 이 부분을 변경해야 합니다.
        publish_date_str = str(data['출판일']) 
        publish_year = int("".join(publish_date_str.split('-')[0]))

        input_data = {
            '정가': data['정가'],
            '품질': data['품질'], # ⭐️ 매핑 없이 받은 값 그대로 사용
            '출판사': data['출판사'],
            '출판일': publish_year, # ⭐️ '출판일'을 연도로 변환하여 사용
            '제본방식': data['제본방식'], # ⭐️ 매핑 없이 받은 값 그대로 사용
            '페이지수': int(data['페이지수']),
            '책무게_g': int(data['책무게_g']),
            '가로_mm': float(data['가로_mm']),
            '세로_mm': float(data['세로_mm'])
        }
        print(f"--- 변환된 input_data: {input_data} ---") # 디버깅용

        # 데이터를 DataFrame으로 변환
        df = pd.DataFrame([input_data])
        print(f"--- 생성된 DataFrame:\n{df} ---") # 디버깅용

        # 라벨 인코더 적용 (범주형 변수에만 적용)
        for column, le in label_encoders.items():
            if column in df.columns:
                try:
                    df[column] = le.transform(df[column])
                    print(f"--- '{column}' 인코딩 완료. 값: {df[column].iloc[0]} ---") # 디버깅용
                except ValueError as ve:
                    print(f"--- 라벨 인코딩 오류: {column} - {data[column]} - {ve} ---")
                    return jsonify({"error": f"알 수 없는 '{column}' 값: {data[column]}. 모델에 학습되지 않은 범주입니다. (원인: {ve})"}), 400
        
        print(f"--- 최종 모델 입력 DataFrame:\n{df} ---") # 디버깅용

        # 예측 수행
        prediction = model.predict(df)[0]
        
        # 예측 결과가 음수이면 0으로 처리하거나 적절한 최소값으로 설정
        if prediction < 0:
            prediction = 0
            
        # 결과를 JSON으로 반환
        return jsonify({"prediction": float(prediction)})

    except KeyError as e:
        print(f"--- KeyError 발생: {e} ---")
        return jsonify({"error": f"입력 데이터의 키 오류: {e}. 필요한 모든 필드가 있는지 확인하세요."}), 400
    except ValueError as e:
        # ⭐️ 날짜 변환 오류 등 숫자 변환 오류를 더 명확하게 잡음
        print(f"--- ValueError 발생: {e} ---")
        return jsonify({"error": f"데이터 변환 오류 또는 모델 입력 형식 오류: {e}. 숫자형 데이터가 올바른지 확인하거나, 날짜 형식을 확인하세요."}), 400
    except Exception as e:
        print(f"--- 예측 중 알 수 없는 오류 발생: {str(e)} ---")
        return jsonify({"error": f"예측 중 알 수 없는 오류 발생: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)