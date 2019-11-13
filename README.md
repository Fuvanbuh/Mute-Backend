
# Mute

<br>

## Description

Es una app dirigida a niños para poder mejorar la compression lectora, con la opcion de crear tus propias historias.

## User Stories

- **ANON:**
    - **Login:** Podras entrar en tu session para tener acceso a todo el contenido de la app.
    - **Signup:** Podras registrarte como usuario para poder login.
    - **404:** Se te mostrara una pagina 404, cuando intentes entrar en una pagina que no este disponible.

- **USER:**
    - **Home Page:** Como usuario tendras acceso a todo el contenido de la app.
    - **Add Story Page:** Podras añadir historias nuevas.
    - **Edit Story Page:** Podras editar unicamente las historias creadas por ti.
    - **Story:** Podras interactuar con la historia.

## Backlog

Story:
- Buscador de historias publicas.
- Diferenciar de quien son las historias.
- Poder escuchar la historia para tener una mejor compression.
- Boton de ayuda para crear la historia.
- Añadir tematicas.
- Las respuestas esten en formato imagen.

App:
- Seleccionar idioma.


<br>


# Client / Frontend

## Routes
| Path | Component | Permissions | Behavior |
| - | - | - | - |
| `/login` | LoginPage | public | Log in page |
| `/signup` | SignupPage | public | Sign up page |
| `/not-found` | NotFoundPage | public | Not found page |
| `/` | HomePage | user only | Home page con links a story, addStory, editStory  |
| `/addStory` | Add Story Page | user only | Crea tu propia historia |
| `/story/:id` | Story Page | user only | Interactua con la historia seleccionada |
| `/story/:id/edit` | Edit Story Page | user only | Edita las historias creadas por ti |
| `/story/:id/path/1` | Paragraph Page | user only | Renderiza el parrafo del cuento |
| `/story/:id/path/1/questions` | Questions Page | user only | Renderiza la pregunta del parrafo |


## Components

### Pages
  - Log in 
  - Signup
  - User home
  - Add story
  - Edit story
  - Story
  - Paragraph
  - Qüestions


### Components
  - 

## Services
- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  

- Story Service
  - getStory()
  - getOneStory()
  - AddOneSTory(Story)
  - UpdateStory(id, updateStory)
  - DeleteOneStory(id)
  
- Map Service 
  - getMap()
  - AddOneMap(newMap)
  - UpdateMap(id, updateMap)
  - DeleteOneMap(id)

<br>


# Server / Backend


## Models

User model

```javascript
{
  userName:String,
  password: String,
  map: [Obj.id],

  
  
}
```

Story model

```javascript
 {
  title:String,
  paragraph:[String],
  questions: [
      {
          question: String,
          answer1: String,
          answer2: String,
          answer3: String,
          correct: String enum,
      }],
  theme:Obj.id,
  creator:Bolean
 }
```

Map model

```javascript
{
  completePath:Number,
  story: Obj.id
}
```
Theme model

```javascript
{
  checkpoint: [String],
  background: String,
  price:String
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| - | - | - | - | - | - |
| GET | /auth/me | | 201 | 404 | recibe la session del usuario |
| POST | /auth/signup | {name, email, password} | 201 | 404 | guardamos los datos del usuario |
| POST | /auth/login | {username, password} | 200 | 401 | Mira si los campos no estan vacios (422), si el usuario existe (404), i si existe la contrasenya (404), entonces inicia session |
| POST | /auth/logout | | 204 | 400 | cierra la session del usuario|
| GET | /map | {maps} | 200 | 404 | recibe todos los maps |
| DELETE | /map/:idMap/delete | {idMap} | 200 | 400 | borro el map |
| GET | /map/:idMAp | {idMap} | | | recibe un mapa |
| PUT | /map/:idMap/edit | {idMap} | | | edita el mapa |
| GET | /story/:idStory | {idStory} | | | recibe una historia |
| PUT | /story/:idStory/edit | {idStory} | | | edita la historia |
| POST | /story/addstory | {newStory} | | 400 | añade una historia nueva |
| DELETE | /map/:idStory/delete | {idStory} | 200 | 400 | borra la historia |

<br>


## Links

### Trello/Kanban

[Trello board](https://trello.com/b/xOLXwWp5/mute)

### Git

[Client repository Link](https://github.com/Fuvanbuh/Mute-Backend)

[Server repository Link](https://github.com/Fuvanbuh/Mute-Frontend)
