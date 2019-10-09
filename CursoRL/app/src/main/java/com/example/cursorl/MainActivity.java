package com.example.cursorl;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn_somar = (Button) findViewById(R.id.btn_somar);
        btn_somar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EditText txtN1 = (EditText) findViewById(R.id.num01);
                EditText txtN2 = (EditText) findViewById(R.id.num02);
                TextView resultado = (TextView) findViewById(R.id.resultado);
                double resultado2;

                resultado2 = Double.parseDouble(txtN1.getText().toString()) + Double.parseDouble(txtN2.getText().toString());
                resultado.setText("Resultado: "+String.valueOf(resultado2));
                //Toast.makeText(getBaseContext(), "Resultado: "+String.valueOf(resultado), Toast.LENGTH_SHORT).show();
            }
        });

        Button btn_sobre = (Button) findViewById(R.id.btn_sobre);
        btn_sobre.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getBaseContext(), SobreActivity.class);
                startActivity(intent);

            }
        });




    }
}
