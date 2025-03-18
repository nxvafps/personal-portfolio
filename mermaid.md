# Application Architecture Diagrams

## Component Hierarchy

```mermaid
graph TB
    RootLayout[RootLayout]
    Providers[Providers]
    StyledRegistry[StyledComponentsRegistry]
    Navbar[Navbar]
    Pages[Pages]

    RootLayout --> StyledRegistry
    StyledRegistry --> Providers
    Providers --> Navbar
    Providers --> Pages

    %% UI Components
    UI[UI Components]
    UI --> Button[Button]
    UI --> Card[Card]
    UI --> Typography[Typography]
    UI --> FormInput[FormInput]
    UI --> InfoList[InfoList]

    %% Card Components
    Card --> CardTitle[CardTitle]
    Card --> CardContent[CardContent]

    %% Typography Components
    Typography --> H1[H1]
    Typography --> H2[H2]
    Typography --> H3[H3]
    Typography --> H4[H4]
    Typography --> Text[Text]
    Typography --> SmallText[SmallText]
    Typography --> Label[Label]

    %% Pages
    Pages --> Home[Home]
    Pages --> Login[Login]
    Pages --> Register[Register]
    Pages --> Dashboard[Dashboard]
    Pages --> Admin[Admin]
    Pages --> About[About]
    Pages --> Contact[Contact]
    Pages --> Projects[Projects]
    Pages --> Unauthorized[Unauthorized]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as Auth API
    participant DB as Database

    U->>C: Visit /login
    U->>C: Enter credentials
    C->>A: signIn()
    A->>DB: Validate credentials
    DB->>A: Return user data
    A->>C: Session token
    C->>U: Redirect to /dashboard

    alt Invalid credentials
        A->>C: Error response
        C->>U: Show error message
    end
```

## Page Layout Structure

```mermaid
graph TB
    PageLayout[PageLayout]
    Container[Container]
    Grid[Grid]
    Section[Section]
    SectionHeader[SectionHeader]

    PageLayout --> Container
    PageLayout --> Grid
    PageLayout --> Section
    Section --> SectionHeader

    %% Variants
    Container --"variant=light"--> LightTheme[Light Theme]
    Container --"variant=dark"--> DarkTheme[Dark Theme]
```

## Route Protection Flow

```mermaid
flowchart TD
    A[User Access] --> B{Check Session}
    B -->|No Session| C[Redirect to Login]
    B -->|Has Session| D{Check Role}
    D -->|Admin Route| E{Is Admin?}
    E -->|Yes| F[Allow Access]
    E -->|No| G[Redirect to Unauthorized]
    D -->|User Route| F
```

## Theme System

```mermaid
graph LR
    Theme[Theme Configuration]
    Colors[Colors]
    Typography[Typography]
    Spacing[Spacing]
    BorderRadius[Border Radius]
    BoxShadow[Box Shadow]
    Media[Media Queries]

    Theme --> Colors
    Theme --> Typography
    Theme --> Spacing
    Theme --> BorderRadius
    Theme --> BoxShadow
    Theme --> Media

    Colors --> Primary[Primary Colors]
    Colors --> Secondary[Secondary Colors]
    Colors --> Text[Text Colors]
    Colors --> Background[Background Colors]
    Colors --> Border[Border Colors]

    Typography --> FontSize[Font Sizes]
    Typography --> FontWeight[Font Weights]
    Typography --> LineHeight[Line Heights]

    Media --> Breakpoints[Screen Breakpoints]
```

## State Management

```mermaid
graph TB
    SessionProvider[Session Provider]
    ThemeProvider[Theme Provider]
    Auth[Authentication State]
    Theme[Theme State]

    SessionProvider --> Auth
    ThemeProvider --> Theme

    Auth --> IsAuthenticated[Is Authenticated]
    Auth --> UserData[User Data]
    Auth --> UserRole[User Role]

    Theme --> Colors[Color Scheme]
    Theme --> Variants[Theme Variants]
```

## Navigation Structure

```mermaid
graph LR
    NavStart[Navbar]

    NavStart --> Home["/"]
    NavStart --> Projects["/projects"]
    NavStart --> About["/about"]
    NavStart --> Contact["/contact"]

    NavStart --> AuthSection{Auth Status}
    AuthSection -->|Not Authenticated| Login["/login"]
    AuthSection -->|Not Authenticated| Register["/register"]
    AuthSection -->|Authenticated| Dashboard["/dashboard"]
    AuthSection -->|Admin| AdminDash["/admin"]

    Dashboard --> Signout[Sign Out]
    AdminDash --> UserManagement[User Management]
    AdminDash --> ProjectManagement[Project Management]
    AdminDash --> SiteSettings[Site Settings]
```

## Database Schema

```mermaid
erDiagram
    User ||--o{ Project : creates
    User ||--o{ Comment : writes
    User ||--o{ ProjectLike : gives
    User ||--o{ CommentLike : gives
    User ||--o{ Account : has
    User ||--o{ Session : has
    Project ||--o{ Comment : has
    Project ||--o{ ProjectLike : receives
    Comment ||--o{ CommentLike : receives

    User {
        int id PK
        string name
        string email UK
        string passwordHash
        UserRole role
        datetime emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }

    Project {
        int id PK
        string title
        string description
        string slug UK
        string imageUrl
        ProjectStatus status
        string liveDemoUrl
        string githubUrl
        string[] technologies
        string[] languages
        boolean featured
        datetime startDate
        datetime endDate
        string category
        string testimonial
        datetime createdAt
        datetime updatedAt
    }

    Comment {
        int id PK
        string content
        int userId FK
        int projectId FK
        datetime createdAt
        datetime updatedAt
    }

    ProjectLike {
        int id PK
        int userId FK
        int projectId FK
        boolean isLike
        datetime createdAt
        datetime updatedAt
    }

    CommentLike {
        int id PK
        int userId FK
        int commentId FK
        boolean isLike
        datetime createdAt
        datetime updatedAt
    }

    Account {
        string id PK
        int userId FK
        string type
        string provider
        string providerAccountId
        string refresh_token
        string access_token
        int expires_at
        string token_type
        string scope
        string id_token
        string session_state
    }

    Session {
        string id PK
        string sessionToken UK
        int userId FK
        datetime expires
    }

    VerificationToken {
        string identifier
        string token UK
        datetime expires
    }

    %% Enums
    ProjectStatus {
        IDEA
        PLANNING
        IN_PROGRESS
        COMPLETED
        ON_HOLD
        ABANDONED
    }

    UserRole {
        ADMIN
        USER
    }
```

## API Endpoints Structure

```mermaid
graph TB
    API[API Routes]

    API --> Auth[/api/auth]
    Auth --> NextAuth[/.../nextauth]
    Auth --> Me[/me]
    Auth --> Register[/register]

    API --> Projects[/api/projects]
    Projects --> CRUD[CRUD Operations]
    Projects --> Languages[Language Management]
    Projects --> Comments[Comment Management]
    Projects --> Likes[Like Management]

    API --> Admin[/api/admin]
    Admin --> Users[User Management]
    Admin --> Settings[Site Settings]

    classDef protected fill:#f9f,stroke:#333,stroke-width:2px
    class Admin,Me protected
```

## Data Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB
    participant Storage

    Client->>API: Request Data
    API->>Auth: Validate Session
    Auth-->>API: Session Valid
    API->>DB: Query Data
    DB-->>API: Return Results

    alt Protected Route
        Auth-->>API: Invalid Session
        API-->>Client: 401 Unauthorized
    end

    alt Data Modification
        API->>DB: Update Data
        API->>Storage: Handle Media
        Storage-->>API: Media URLs
        DB-->>API: Update Success
        API-->>Client: Success Response
    end
```

## Styling Architecture

```mermaid
graph TB
    StyledComponents[Styled Components]
    Registry[StyledComponentsRegistry]
    GlobalStyles[Global Styles]
    ThemeProvider[Theme Provider]

    StyledComponents --> Registry
    Registry --> SSR[Server-Side Rendering]

    ThemeProvider --> Components[UI Components]
    ThemeProvider --> Theme[Theme Object]

    Theme --> Colors[Colors]
    Theme --> Typography[Typography]
    Theme --> Spacing[Spacing]
    Theme --> MediaQueries[Media Queries]

    Components --> Button[Button Styles]
    Components --> Card[Card Styles]
    Components --> Form[Form Styles]
    Components --> Layout[Layout Styles]
    Components --> Typography[Typography Styles]

    MediaQueries --> Responsive[Responsive Styles]
    Responsive --> Mobile[Mobile Styles]
    Responsive --> Tablet[Tablet Styles]
    Responsive --> Desktop[Desktop Styles]
```
