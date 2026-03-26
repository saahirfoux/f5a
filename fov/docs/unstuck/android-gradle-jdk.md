# Android Gradle requires Java 17+

## Symptoms

Gradle fails when configuring `:app` (e.g. after `./gradlew generateCodegenArtifactsFromSchema` from `android/`), for example:

`Android Gradle plugin requires Java 17 to run. You are currently using Java 16.`

Example detail from the log:

`Your current JDK is located in /Library/Java/JavaVirtualMachines/zulu-16.jdk/Contents/Home`

## Cause

The Android Gradle Plugin used by this project expects **JDK 17 or newer**. Gradle uses whatever JDK macOS exposes as default (via `JAVA_HOME` or `/usr/libexec/java_home`), which is often an older install left over from another project.

## Check what you have (macOS)

```bash
java -version
/usr/libexec/java_home -V
```

- If the **newest** line in the `java_home -V` list is still **below 17** (e.g. 16, 11, or 8), you have Java installed but it is **too old for this Android toolchain**. You need to **install** JDK 17 or newer; changing `JAVA_HOME` alone is not enough until a 17+ JDK exists on disk.
- If **17, 21, or 24** appears in the list, you only need to **select** it (next section).

## Install JDK 17+ on macOS

Pick one approach.

### Option A — Homebrew cask (Temurin 17, easy for `java_home`)

[Eclipse Temurin](https://adoptium.net/) is a common distribution. With [Homebrew](https://brew.sh):

```bash
brew install --cask temurin@17
```

The installer places the JDK under `/Library/Java/JavaVirtualMachines/`, so it shows up in `/usr/libexec/java_home -V` without extra steps.

### Option B — Homebrew `openjdk@17`

```bash
brew install openjdk@17
```

Homebrew prints **caveats** after install. Follow them: you typically add the formula’s `bin` to your `PATH` for the `java` command, and optionally create the suggested symlink into `/Library/Java/JavaVirtualMachines/` so `/usr/libexec/java_home` lists this JDK like a normal macOS install.

### Option C — Manual installer

Download **JDK 17** (or **21**) for macOS from [Adoptium](https://adoptium.net/) or [Azul Zulu](https://www.azul.com/downloads/), run the installer, then confirm with `/usr/libexec/java_home -V`.

## Point Gradle at JDK 17+

After a 17+ JDK is installed:

- **Shell (current session):**  
  `export JAVA_HOME=$(/usr/libexec/java_home -v 17)`  
  Use `-v 21` or `-v 24` if you installed that version instead. If the command errors, run `java_home -V` and use a version that appears in the list.

- **Persistent options:** set `JAVA_HOME` in your shell profile (e.g. `~/.zshrc`), Android Studio’s **Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK**, or `org.gradle.java.home` in `android/gradle.properties` to the absolute path of the 17+ JDK.

Stop any old Gradle daemons if they picked up the wrong Java, then re-run from `android/`:

```bash
./gradlew --stop
```

Then your Gradle command or, from the **project root** (`fov/`), `bun android`.

## See also

- [Expo Go / dev client](./expo-go-nitro-dev-client.md) for the full mobile dev flow.
