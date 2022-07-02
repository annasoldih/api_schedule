![](https://soldi.dev.br/safe/img/logo_346x45.png)

![](https://img.shields.io/badge/API-REST-green) ![](https://img.shields.io/badge/Node.js-red)

# API para Agendamento de Horários

Projeto de gerenciamento do cadastro de horários de atendimentos.

## Instalação
Na pasta raiz, execute:
`npm run install`

## Execução Local
Na pasta raiz, execute:
`npm run dev`

## Executando em Docker
Na pasta raiz, execute:
### Para subir
`docker-compose up`

### Para descer
`docker-compose down`


# Endpoints
### Resumo
`POST /rule`		Cria uma nova regra
`DELETE /rule/:id`	Deleta uma regra cujo id foi passado como parâmetro
`GET /rules`		Lista as regras existentes
`POST /available`	Verifica os horários disponíveis em um intervalo de datas


## Deploy
https://annasoldih-scheduler-api.herokuapp.com/

## Postman Collection:

```
{
	"info": {
		"_postman_id": "0476e01d-fe41-4599-906f-2826985f2f09",
		"name": "scheduleAPI",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "17207399"
	},
	"item": [
		{
			"name": "POST Unique Rule",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"type\": \"unique\",\r\n    \"day\": \"01-10-2022\",\r\n    \"start\": \"09:10\",\r\n    \"end\": \"10:15\"\r\n}"
				},
				"url": {
					"raw": "http://localhost:3001/rule",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"rule"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST Daily Rule",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"limitDay\": \"15-10-2022\",\r\n    \"type\": \"daily\",\r\n    \"start\": \"09:10\",\r\n    \"end\": \"10:15\"\r\n}"
				},
				"url": {
					"raw": "http://localhost:3001/rule",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"rule"
					]
				}
			},
			"response": []
		},
		{
			"name": "POST Weekly Rule",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"limitDay\": \"15-10-2022\",\r\n    \"type\": \"weekly\",\r\n    \"start\": \"09:10\",\r\n    \"end\": \"10:15\",\r\n    \"weekdays: [1, 4]\r\n}"
				},
				"url": {
					"raw": "http://localhost:3001/rule",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"rule"
					]
				}
			},
			"response": []
		},
		{
			"name": "DELETE Rule",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:3001/rule/:id",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"rule",
						":id"
					],
					"variable": [
						{
							"key": "id",
							"value": null
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "GET List of Rules",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3001/rules",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"rules"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET Available Schedule",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3001/available",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"available"
					]
				}
			},
			"response": []
		}
	]
}
```
