import os
from joblib import load

# ⭐️ Flask 앱이 있는 폴더 경로 (app.py, model.pkl, label_encoders.pkl이 있는 곳)
# 현재 경로는 'C:\Users\Administrator\Mini_Project2\project_root\flask' 입니다.
BASE_DIR = r"C:\Users\Administrator\Mini_Project2\project_root\flask"
LABEL_ENCODERS_PATH = os.path.join(BASE_DIR, "label_encoders.pkl")

print(f"Label encoders 파일 경로: {LABEL_ENCODERS_PATH}")

try:
    # label_encoders.pkl 파일을 로드합니다.
    loaded_label_encoders = load(LABEL_ENCODERS_PATH)
    print("\n--- label_encoders.pkl 로드 성공 ---")

    # 모든 라벨 인코더의 클래스(학습된 범주)를 출력합니다.
    for column, le in loaded_label_encoders.items():
        if hasattr(le, 'classes_'): # LabelEncoder 객체인지 확인
            print(f"\n컬럼: '{column}'")
            print(f"  학습된 클래스 (classes_): {list(le.classes_)}")
            # 만약 클래스 수가 너무 많으면 일부만 보여줍니다.
            if len(le.classes_) > 20:
                print(f"  ... (총 {len(le.classes_)}개)")
        else:
            print(f"\n컬럼: '{column}' (LabelEncoder 객체가 아님 또는 classes_ 속성 없음)")

except FileNotFoundError:
    print(f"\n오류: 파일을 찾을 수 없습니다. '{LABEL_ENCODERS_PATH}' 경로를 확인해주세요.")
except Exception as e:
    print(f"\n오류: label_encoders.pkl 로드 또는 확인 중 문제 발생: {e}")

print("\n--- 확인 완료 ---")