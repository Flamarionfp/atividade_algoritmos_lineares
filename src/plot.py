import pandas as pd
import matplotlib.pyplot as plt

csv_path = "data/results.csv"

df = pd.read_csv(csv_path)

plt.figure(figsize=(12, 7))

for column in df.columns:
    if column != "n":
        plt.plot(df["n"], df[column], label=column)


plt.title("Comparação de Algoritmos de Ordenação")
plt.xlabel("Tamanho do Array (n)")
plt.ylabel("Tempo Médio de Execução (ms)")
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
